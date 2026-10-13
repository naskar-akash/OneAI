import React,{ useEffect } from 'react'
import Nav from './Nav'
import MessageList from './MessageList.jsx';
import ChatInput from './ChatInput.jsx';
import { useSelector, useDispatch } from "react-redux";
import { getMessages } from "../features/getMessages.js"
import { setArtifacts, setMessages } from "../redux/messageSlice.js"

const ChatArea = () => {
  const { selectedConversation } = useSelector((state) => state.conversation)
  const dispatch = useDispatch();

  useEffect(() => {
    const getMsg = async () => {
      if (selectedConversation) {
        if (selectedConversation.title == "New Chat") 
        return;
      const data = await getMessages(selectedConversation?._id)
        dispatch(setMessages(data))
        const latestArtifactMsg = [...data].reverse().find(msg=>msg.artifacts && msg.artifacts.length > 0)
        dispatch(setArtifacts(latestArtifactMsg?.artifacts || []))
      }
    } 
    getMsg()
  }, [selectedConversation]) // Here is a problem. getMsg is called everytime when selectedConversation changes. Thus when I send message to chatagent user's message is not displayed in the chat area because selectedConversation is not changed. I need to find a way to call getMsg when a new message is sent.

  
  return (
    <div className='flex-1 flex flex-col min-w-0'>
      <Nav />
      <MessageList /> 
      <ChatInput />
    </div>
  )
}

export default ChatArea
