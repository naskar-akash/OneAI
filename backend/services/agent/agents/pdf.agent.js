import { getModel } from "../config/llmModels.js";
import { generatePdf } from "../utils/generatePdf.js";
import { uploadToS3 } from "../utils/uploadToS3.js";
import { getFromS3 } from "../utils/getFromS3.js";
import { deductCredits } from "../utils/deductCredits.js";

export const pdfAgent = async (state) => {
    try {
        const llm = await getModel("pdf");
        const prompt = `
            You are an expert document writer.

            Return ONLY valid JSON.

            DO NOT return markdown.
            
            DO NOT return explanations.

            Structure:

            {
                "title": "",
                "subtitle": "",
                "sections": [
                    {
                        "headings": "",
                        "points": []
                    }
                ]
            }
            
            Generate 4-8 sections.

            Each section should have 3-6 concise bullet points.

            Topics: ${state.prompt}
        `
        const res = await llm.invoke(prompt)
        const data = JSON.parse(res.content)

        await deductCredits(state.userId, "pdf")

        const pdfBuffer = await generatePdf(data)
        const filename = `pdf-${Date.now()}.pdf`

        await uploadToS3(filename, pdfBuffer, "application/pdf")
        const downloadUrl = await getFromS3(filename, 600)
        
        return {
            ...state,
            aiResponse: [
            "# PDF Generated Successfully! ✨",
            "",
            `**${data.title}**`,
            "",
            `⬇️ [Download PDF](${downloadUrl})`,
            "",
            "⏳ **Note:** This link is valid for 10 minutes only.",
          ].join("\n"),
        }
        
    } catch (error) {
        console.log(error)
         return {
        ...state,
        aiResponse: "❌ Error in generating PDF. Try again."
    }
    }
}