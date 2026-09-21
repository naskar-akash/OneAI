import React from "react";

const MessageBubble = ({ role, content }) => {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[72%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${isUser ? "bg-linear-to-br from-indigo-500 to-violet-700 text-white rounded-tr-sm" : "bg-white/5 border border-white/10 text-slate-200 rounded-tl-sm"}`}
      >{content}</div>
    </div>
  );
};

export default MessageBubble;
