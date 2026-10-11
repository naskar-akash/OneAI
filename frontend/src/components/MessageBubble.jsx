import { X } from "lucide-react";
import React, { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MessageBubble = ({ role, content, images }) => {
  const isUser = role === "user"
  const [lightBox, setLightBox] = useState(null);

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`w-fit max-w-[92vw] md:max-w-[72%] px-4 py-2.5 rounded-2xl wrap-break-word overflow-hidden leading-relaxed ${isUser ? "bg-linear-to-br from-indigo-500 to-violet-700 text-white rounded-tr-sm" : "text-slate-200 rounded-tl-sm"}`}
      >
        {images && images.length > 0 && (
          <div className="flex flex-wrap gap-3 my-4">
            {images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                onClick={()=> setLightBox(image.url)}
                alt={image.title || "Image"}
                loading="lazy"
                onError={(e) => e.currentTarget.remove()}
                className="w-40 h-30 md:w-48 md:h-36 object-cover rounded-xl border border-white/10 cursor-zoom-in
           hover:opacity-90 transition-all duration-200"
              />
            ))}
          </div>
        )}
        <Markdown remarkPlugins={[remarkGfm]}
        components={{
          h1: ({children}) => (
            <h1 className="text-2xl font-bold mt-5 mb-3">{children}</h1>
          ),
          h2: ({children}) => (
            <h2 className="text-xl font-bold mt-4 mb-2">{children}</h2>
          ),
          h3: ({children}) => (
            <h3 className="text-lg font-semibold mt-3 mb-2">{children}</h3>
          ),
          p: ({children}) => (
            <p className="whitespace-pre-wrap wrap-break-word mb-3">{children}</p>
          ),
          ul: ({children}) => (
            <ul className="list-disc pl-5 space-y-1 my-2">{children}</ul>
          ),
          ol: ({children}) => (
            <ol className="list-decimal pl-5 space-y-1 my-2">{children}</ol>
          ),
          table: ({children}) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border border-white/10">{children}</table>
            </div>
          ),
        }}
        >{content}</Markdown>
      </div>
      {lightBox && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6 backdrop-blur-sm"
          onClick={() => setLightBox(null)}
        >
          <button onClick={() => setLightBox(null)} className="absolute top-5 right-5 text-white/80 hover:text-white rounded-full p-2"><X/></button>
          <img
            src={lightBox}
            alt="Enlarged view"
            className="max-w-[90vw] max-h-[85vw] rounded-2xl border border-white/10 shadow-2xl object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
