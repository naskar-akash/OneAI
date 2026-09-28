import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversations: [],
    selectedConversation: null,
  },
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload; // To overwrite all conversations which have been got by calling get-conversatios
    },
    addConversations: (state, action) => {
      state.conversations.unshift(action.payload); // Don't update all the conversations, just add the newer one when create-conversation is called
    },
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    setConversationTitle: (state, action) => {
      const { conversationId, title } = action.payload;
      state.conversations = state.conversations.map((conv) =>
        conv._id === conversationId ? { ...conv, title } : conv,
      );
      if (state.selectedConversation?._id === conversationId) {
        state.selectedConversation = { ...state.selectedConversation, title };
      }
    },
  },
});

export const {
  setConversations,
  addConversations,
  setSelectedConversation,
  setConversationTitle
} = conversationSlice.actions;
export default conversationSlice.reducer;
