import axios from "axios";
import {graph} from "../graph/graph.js"
import { addMessage } from "../config/memory.js";
import redis from "../../../shared/redis/redis.js";

export const agent = async (req, res) => {
  try {
    const { prompt, conversationId } = req.body; 
    
    // to save the user prompt in the database for future reference
     await axios.post(
      `${process.env.CHAT_SERVICE_URL}/save-message`,
      { conversationId, role: "user", content: prompt },
    );
    const result = await graph.invoke({
        prompt, conversationId
    })
    const response = result.aiResponse;
     // to save user content to redis
    await addMessage( conversationId, "user", prompt)
    // to save assistant content to redis
    await addMessage( conversationId, "assistant", response)
    // to save the assistant's response in the database for future reference
    await axios.post(
      `${process.env.CHAT_SERVICE_URL}/save-message`,
      { conversationId, role: "assistant", content: response },
    );
    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ message: `Agent error: ${error}` });
  }
};
