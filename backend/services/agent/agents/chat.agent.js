import { getModel } from "../config/llmModels.js";

export const chatAgent = async (state) => {
  const llm = await getModel("chat");
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
  const response = await llm.invoke([
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "human",
      content: state.prompt,
    },
  ]);

  return {
    ...state,
    aiResponse: response.content,
  };
};
