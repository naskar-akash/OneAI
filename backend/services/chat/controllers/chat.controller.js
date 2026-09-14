import Conversation from "../models/conversation.model"

export const createConversation = async ( req, res ) => {
    try {
        const userId = req.header["x-user-id"]
        console.log("userId: ", userId)

        const conversation = await Conversation.create({
            userId: userId,
        })
        return res.status(200).json(conversation)
    } catch (error) {
        return res.status(500).json({message: `Create conversation error: ${error}`});
    }
}