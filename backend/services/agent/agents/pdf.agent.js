import { getModel } from "../config/llmModels.js";

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
        console.log(JSON.parse(res.content))
        
    } catch (error) {
        console.log(error)
         return {
        ...state,
        aiResponse: "❌ Error in generating image. Try again."
    }
    }
}