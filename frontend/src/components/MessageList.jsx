import React from 'react'
import { useSelector } from 'react-redux'
import MessageBubble from './MessageBubble.jsx';

const MessageList = () => {
    const { selectedConversation } = useSelector((state)=>state.conversation);
    const { messages } = useSelector((state)=>state.message);

  return (
    <div className='flex-1 overflow-y-auto p-6 space-y-5 scrollbar-none [&::-webkit-scrollbar]:hidden'>
      {(messages.length === 0 || ! selectedConversation) ? (
        <div className='h-full flex flex-col items-center justify-center gap-4 text-center'>
          <div className="flex flex-col gap-2">
            <h1 className='text-xl font-semibold text-slate-200 tracking-tight'>OpenAI</h1>
            <p className='text-lg font-medium text-slate-400 tracking-tight'>How can I help you today?</p>
            <p className='text-sm max-w-65 text-slate-600'>Ask me anything - code, ideas, explanation or just a quick question!</p>
          </div>
          <div className='flex flex-wrap justify-center gap-2 mt-1'>
            {["Write a Netflix clone", "Explain", "Build a dashboard"].map((s,i)=>(
                <button key={i} className='bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200'>
                  {s}
                </button>
            ))}
          </div>
        </div>
      ): (
        <div>
            {messages.map((message, i)=>(
                <div key={i}>
                    <MessageBubble role={message.role} content={message.content} />
                </div>
            ))}
        </div>
      ) }
    </div>
  )
}

export default MessageList
