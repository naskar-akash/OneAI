import fs from "fs";
import { PDFParse } from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { vectorStore } from "../config/vectorDb.js";
import { getModel } from "../config/llmModels.js";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { deductCredits } from "../utils/deductCredits.js";

export const pdfRag = async (state) => {
  try {
    const buffer = fs.readFileSync(state.file.path);
    const pdf = new PDFParse({
      data: buffer,
    });
    const result = pdf.getText();
    const text = result.text;

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const docs = await splitter.createDocuments([text]);
    const collectionName = `pdf-${Date.now()}`;
    const store = await vectorStore(docs, collectionName)

    const releventDocs = await store.similaritySearch(state.prompt, 5)

    const context = releventDocs.map(d => d.pageContent).join("/n/n")
    const llm = await getModel("pdfRag")

    const messages = [
        new SystemMessage(`
            You are OneAI PDF Assistant.

            RULES:

            - Answer ONLY from the uploaded PDF.
            - Never make up information.
            - If the answer is not present in the PDF, reply: 
                "I couldn't find this information in the uploaded PDF."
            - Use Markdown formatting.

            `),
            new HumanMessage(`
                Context: ${context}
                Question: ${state.prompt}
                `)
    ]

    const response = llm.invoke(messages)
    await deductCredits(state.userId, "pdfRag")
    return {
        ...state,
        aiResponse: response.content
    }

  } catch (error) {
    console.log(error)
    return {
      ...state,
      aiResponse: "❌ Error in analyzing PDF. Try again.",
    };
  }
  finally {
    fs.unlinkSync(state.file.path)
  }
};
