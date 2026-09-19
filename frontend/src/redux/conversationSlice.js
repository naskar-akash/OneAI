import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
    name: "conversation",
    initialState: {
        conversations: [],
    },
    reducers: {
        setConversations: (state, action) => {
            state.conversations = action.payload  // To overwrite all conversations which have been got by calling get-conversatios
        },
        addConversations: (state, action) => {
            state.conversations.unshift(action.payload)  // Don't update all the conversations, just add the newer one when create-conversation is called
        }
    }
})

export const { setConversations, addConversations } = conversationSlice.actions
export default conversationSlice.reducer