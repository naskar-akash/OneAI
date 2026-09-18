import { getModel } from "../config/llmModels"

export const chatAgent = async (state) => {
    const llm = await getModel("chat")
    const systemPrompt = `You are the Chat Agent of a multi-agent AI platform named "OneAI".`
    const response = await llm.invoke([
        {
            "role": "system",
            "content": systemPrompt
        },
        {
            "role": "human",
            "content": state.prompt
        }
    ])

    return {
        ...state,
        aiResponse: response.content
    }
}