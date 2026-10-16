import { getModel } from "../config/llmModels"

export const visionAgent = async (state) => {
    const llm = await getModel("image")
    const res = await llm.invoke(`
        You are an elite AI prompt engineer.

        Convert the uuser request into a highly detailed image generation prompt.

        Requirements:

        - Cinematic lighting
        - Professional composition
        - Ultra realistic
        - High detail
        - Beautiful colour palette
        - Sharp focus
        - 8K quality
        - Photorealistic
        - Depth of field
        - professional photography
        - Stunning visuals

        Return only the image prompt.

        User request: ${state.prompt}
        `)
}