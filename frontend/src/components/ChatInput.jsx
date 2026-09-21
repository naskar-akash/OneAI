import { Mic, Paperclip, Send } from 'lucide-react'
import React from 'react'

const ChatInput = () => {
  return (
    <div className='w-full overflow-hidden px-3 md:px-5 py-4 border-t border-stone-700'>
      <div className='flex flex-col gap-2 bg-white/5 border border-white/[0.07] rounded-2xl px-4 py-3 pb-3'>
      <textarea placeholder='Ask anything....' rows={3} className='w-full bg-transparent outline-none resize-none text-sm text-slate-200 placeholder:text-gray-600 leading-relaxed scrollbar-none [&::-webkit-scrollbar]:hidden disabled:opacity-50'/>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-1'>
            <button className='flex items-center justify-center w-7 h-8 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent hover:border-white/6 transition-all duration-150 bg-transparent cursor-pointer'>
                <Paperclip size={16} />
            </button>
            <button className='flex items-center justify-center w-7 h-8 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent hover:border-white/6 transition-all duration-150 bg-transparent cursor-pointer'>
                <Mic size={16} />
            </button>
        </div>
        <div>
            <button className='flex items-center justify-center w-10 h-10 rounded-full text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent hover:border-white/6 transition-all duration-150 bg-transparent cursor-pointer'>
                <Send size={16} />
            </button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default ChatInput
