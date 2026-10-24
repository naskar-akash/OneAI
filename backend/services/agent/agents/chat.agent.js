import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { getModel } from "../config/llmModels.js";
import { getMemory } from "../config/memory.js";
import { deductCredits } from "../utils/deductCredits.js";

export const chatAgent = async (state) => {
  try {
    const llm = await getModel("chat");
    const history = await getMemory(state.conversationId);

    const searchContext = state.searchResults
      ? `
      Web Search Results: 
          ${JSON.stringify(state.searchResults)}
      Answer the user's question based on the search results above.`
      : `
      No web search results available. Answer the user's question based on your knowledge.`;

    // main prompt for the chat agent
    const systemPrompt = `You are "OneAI" an intelligent AI agent.

  ${searchContext}
  If Search Context exists:
   - Use the search results to answer the user's question.
   - Do not mention internal tools.

  Rules:
   
  - For simple questions like greetings, short queries respond naturally in plain text.
  - For technical, educational or detailed topics use clean Markdown. 

    Formatting:
    - Use # for titles and ## for sections.
    - Leave a blank line after heading.
    - Use bullet points for lists.
    - Use numbered lists for steps.
    - Use fenced code blocks with language tags for code.
    - Keep paragraph short and readable.
    - Never write headings and content on the same line.
    - Never generate large walls of text.

    Most Important:
    - Leave spaces between every paragraph and section for better readability.
    `;

    const messages = [new SystemMessage({ content: systemPrompt })];

    history.forEach((msg) => {
      if (msg.role === "user") {
        messages.push(new HumanMessage({ content: msg.content }));
      }
      if (msg.role === "assistant") {
        messages.push(new AIMessage({ content: msg.content }));
      }
    });

    messages.push(new HumanMessage({ content: state.prompt }));

    const response = await llm.invoke(messages);

     await deductCredits(state.userId, "chat")

    return {
      ...state,
      aiResponse: response.content,
    };
  } catch (error) {
    return {
      ...state,
      aiResponse: "❌ Error in generating response. Try again.",
    };
  }
};
