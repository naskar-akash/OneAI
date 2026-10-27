// To configure various LLM models for different agents.
import dotenv from "dotenv";
dotenv.config()
import { ChatGroq } from "@langchain/groq"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { ChatOpenRouter } from "@langchain/openrouter";

const groq = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: process.env.GROQ_API_KEY,
    // streaming: true,  To be implemented future
})

const gemini = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash-lite",
    apiKey: process.env.GOOGLE_API_KEY,
    // streaming: true,  To be implemented future
})

const openrouter = new ChatOpenRouter({
  model: "deepseek/deepseek-chat",
  temperature: 0,
  maxTokens: 2500,
  // other params...
});

export const getModel = async ( agent ) => {
    switch (agent) {
        case "chat":
            return groq;
        case "search":
            return groq;
        case "coding":
            return openrouter;
        case "imageAnalyzer":
            return gemini;
        default:
            return groq;
    }
}