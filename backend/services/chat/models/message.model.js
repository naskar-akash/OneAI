import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: null
    }
  },
  { _id: false }
);


const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation"
    },
    role: {
        type: String,
        enum: ["user", "assistant"]
    },
    content: String,
    images: {
        type: [imageSchema],
        default: []
    },
},{
    timestamps: true
})

const Message = mongoose.model("Message", messageSchema);
export default Message;