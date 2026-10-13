import {getModel} from "../../agent/config/llmModels.js"

export const codingAgent = async (state) => {
    const intentLlm = await getModel("intent")
    const llm = await getModel("coding")
    const intentRes = await intentLlm.invoke(`
        You are an intelligent intent classifier.
        Return ONLY one of these values.

        CODE_GENERATION
        CODE_REVIEW
        CODE_EXPLANATION 
        DEBUGGING
        OPTIMIZATION
        CONVERSION
        DOCUMENTATION

        User Request: ${state.prompt}
        `)
        const intent = intentRes.content
        // Logic for code generation
        if (intent == "CODE_GENERATION"){
            const prompt = `
            You are a smart coding agent of an multi-agent AI platform named ONE_AI
            
            Default stack:
            - HTML
            - CSS
            - JavaScript

            Use React / Next.js / Vue ONLY if explicitly requested.

            Rules:
            - Responsive
            - Mdern UI
            - CSS Variables
            - Flexbox/Grid
            - Smooth scroll 
            - Hover effect
            - Beautiful spacing
            - Single page unless user asks otherwise.

            Answer ONLY valid JSON.

            Schema: 
            {
                "files": [
                    {
                        "name": "index.html",
                        "content": "..."
                    },
                    {
                        "name": "style.css",
                        "content": "..."
                    },
                    {
                        "name": "script.js",
                        "content": "..."
                    }
                ]
            }
            
            RULES:

            - Output must start with {
            - Output must end with }
            - No markdown
            - No explanation
            - No extra text
            - No \'\'\'
            - Never mention intent

            User Request: ${state.prompt}
            `
            const res = await llm.invoke(prompt)
            const data = JSON.parse(res.content)
            return {
                ...state,
                aiResponse: "Code generated successfully.",
                artifacts: [
                    {
                        id: Date.now(),
                        type: "code",
                        title: state.prompt,
                        files: data.files || []
                    }
                ]
            }
        }
        // Logic for reviewing / debugging
        const response = await llm.invoke(`
            The user's request is: ${intent}

            Return Markdown only.

            Never generate project files.

            Use heafings like:
            
            # Overview
            ## Explanation
            ## Problems
            ## Improvements
            ## Best practices
            ## Optimised code (optional)

            User Request: ${state.prompt}
            `)
            const data = response.content
            return {
                ...state,
                aiResponse: data,
                artifacts: []
            }
}