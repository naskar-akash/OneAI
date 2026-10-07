import { Mic, Paperclip, Send } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../features/sendMessage.js";
import { addMessages } from "../redux/messageSlice.js";
import { createConversation } from "../features/createConversation.js";
import { updateConversation } from "../features/updateConversation.js";
import { addConversations, setConversationTitle, setSelectedConversation } from "../redux/conversationSlice.js";
import { agents } from "../assets/Array/agentsArray.js";

const ChatInput = () => {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const { messages } = useSelector((state) => state.message);
  const [value, setValue] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("Auto")
  const dispatch = useDispatch();

  const handleSendMessage = async () => {

  // automatically create a new conversation if no conversation is selected
  let conversation = selectedConversation;
    if( !conversation ){
      const conv = await createConversation()
      dispatch(setSelectedConversation(conv))
      dispatch(addConversations(conv))
      conversation = conv; 
    }

    // Updating conversation title
    if (conversation.title === "New Chat") {
      await updateConversation({ id: conversation._id, title: value.trim() });
      dispatch(setConversationTitle({ conversationId: conversation?._id, title: value.trim().slice(0, 20) }));
    }

    const payload = {
      prompt: value.trim(),
      conversationId: conversation?._id,
      agent: selectedAgent.toLocaleLowerCase()  
    };

    dispatch(addMessages({ role: "user", content: value.trim()}));
    setValue("");
    const data = await sendMessage(payload);
    dispatch(addMessages({ role: "assistant", content: data }));
    console.log(data);
  };

  return (
    <div className="w-full overflow-hidden px-3 md:px-5 py-4 border-t border-stone-700">
      <div className="flex flex-col gap-2 bg-white/5 border border-white/[0.07] rounded-2xl px-4 py-3 pb-3">
      {/* To map agents' icons */}
      <div className="flex w-[80%] gap-2 flex-wrap pr-2">
        {agents.map((agent,i) => {
          const isActive = selectedAgent === agent.label;
          const Icon = agent.icon;
          return (
            <button key={i} onClick={()=>setSelectedAgent(agent.label)} className={`shrink-0 cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border transition-all ${isActive ? "bg-linear-to-r from-indigo-500 to-violet-600 text-white border-transparent shadow-[0_1px_8px_rgba(99,102,241,.35)]": "bg-white/3 text-slate-400 border-white/6 hover:bg-white/7"}`}>
              <Icon size={14} className={isActive ? "text-white" : "text-slate-500"}/> {agent.label}
            </button>
          )
        })}
      </div>

        <textarea
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder="Ask anything...."
          rows={3}
          className="w-full bg-transparent outline-none resize-none text-sm text-slate-200 placeholder:text-gray-600 leading-relaxed scrollbar-none [&::-webkit-scrollbar]:hidden disabled:opacity-50"
        />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <button className="flex items-center justify-center w-7 h-8 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent hover:border-white/6 transition-all duration-150 bg-transparent cursor-pointer">
              <Paperclip size={16} />
            </button>
            <button className="flex items-center justify-center w-7 h-8 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent hover:border-white/6 transition-all duration-150 bg-transparent cursor-pointer">
              <Mic size={16} />
            </button>
          </div>
          <div>
            <button
              onClick={handleSendMessage}
              disabled={!value}
              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-150 ${value.trim() ? "text-white hover:text-slate-300 bg-linear-to-br from-blue-600 to-purple-700 hover:opacity-90  cursor-pointer" : "bg-gray-600 text-slate-400 cursor-not-allowed"}`}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
