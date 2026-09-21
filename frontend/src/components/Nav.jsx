import { MessageSquare } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const Nav = () => {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const { messages } = useSelector((state) => state.message);

  return (
    <>
      {selectedConversation && (
        <div className="h-15 flex items-center gap-3 px-5 border-b border-white/6 bg-mauve-900">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
            <MessageSquare size={15} className="text-indigo-400" />
          </div>
          <div className="text-sm font-semibold text-slate-100 tracking-tight">
            {selectedConversation?.title || "New Chat"}
          </div>
          <div className="text-xs font-medium text-slate-500 bg-white/5 border border-white/6 px-1 py-0.5 rounded-full">
            {messages?.length} Messages
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
