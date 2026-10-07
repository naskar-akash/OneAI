import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { getModel } from "../config/llmModels.js";
import { getMemory } from "../config/memory.js";

export const chatAgent = async (state) => {
  const llm = await getModel("chat");
  const history = await getMemory(state.conversationId);

  const searchContext = state.searchResults ? `` : ``

  const systemPrompt = `You are "OneAI" an intelligent AI agent.

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
    } if (msg.role === "assistant") {
      messages.push(new AIMessage({ content: msg.content }));
    }
  });

  messages.push(new HumanMessage({ content: state.prompt }));

  const response = await llm.invoke(messages);

  return {
    ...state,
    aiResponse: response.content,
  };
};
