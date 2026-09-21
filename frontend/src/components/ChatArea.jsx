import React,{ useEffect } from 'react'
import Nav from './Nav'
import MessageList from './MessageList.jsx';
import ChatInput from './ChatInput.jsx';
import { useSelector, useDispatch } from "react-redux";
import { getMessages } from "../features/getMessages.js"
import { setMessages } from "../redux/messageSlice.js"

const ChatArea = () => {
  const { selectedConversation } = useSelector((state) => state.conversation)
  const dispatch = useDispatch();

  useEffect(() => {
    const getMsg = async () => {
      if (selectedConversation) {
        const data = await getMessages(selectedConversation?._id)
        dispatch(setMessages(data))
      }
    } 
    getMsg()
  }, [selectedConversation])

  
  return (
    <div className='flex-1 flex flex-col'>
      <Nav />
      <MessageList /> 
      <ChatInput />
    </div>
  )
}

export default ChatArea
