import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
    name: "conversation",
    initialState: {
        conversations: [],
        selectedConversation: null
    },
    reducers: {
        setConversations: (state, action) => {
            state.conversations = action.payload  // To overwrite all conversations which have been got by calling get-conversatios
        },
        addConversations: (state, action) => {
            state.conversations.unshift(action.payload)  // Don't update all the conversations, just add the newer one when create-conversation is called
        },
        setSelectedConversation: (state, action) => {
            state.selectedConversation = action.payload
        },
    }
})

export const { setConversations, addConversations, setSelectedConversation } = conversationSlice.actions
export default conversationSlice.reducer