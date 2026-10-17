import { getModel } from "../config/llmModels.js";
import axios from "axios";
import { uploadToS3 } from "../utils/uploadToS3.js";
import { getFromS3 } from "../utils/getFromS3.js";

export const visionAgent = async (state) => {
  try {
    const llm = await getModel("image");
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
        `);

    const prompt = res.content.trim();
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

    const imageRes = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(imageRes.data);
    const filename = `image-${Date.now()}.png`;

    await uploadToS3(filename, buffer, "image/png");
    const downloadUrl = await getFromS3(filename, 600);


    return {
      ...state,
      aiResponse: [
            "🎨 Image Generated Successfully! ✨",
            "",
            `![Generated Image](${downloadUrl})`,
            "",
            `⬇️ [Download Image](${downloadUrl})`,
            "",
            "⏳ **Note:** This link is valid for 10 minutes only.",
          ].join("\n"),
    };
  } catch (error) {
    return {
        ...state,
        aiResponse: "❌ Error in generating image. Try again."
    }
  }
};
