import { Check, Copy, ExternalLink, X } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import React, { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const MessageBubble = ({ role, content, images }) => {
  const isUser = role === "user";
  const [lightBox, setLightBox] = useState(null);
  const [copyCode, setCopyCode] = useState("");

  // Function to copy code to clipboard
  const copyToClipBoard = async (code) => {
    await navigator.clipboard.writeText(code);
    setCopyCode(code);
    setTimeout(() => {
      setCopyCode("");
    }, 2000);
  };

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
                onClick={() => setLightBox(image.url)}
                alt={image.title || "Image"}
                loading="lazy"
                onError={(e) => e.currentTarget.remove()}
                className="w-40 h-30 md:w-48 md:h-36 object-cover rounded-xl border border-white/10 cursor-zoom-in
           hover:opacity-90 transition-all duration-200"
              />
            ))}
          </div>
        )}
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-2xl font-bold mt-5 mb-3">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-bold mt-4 mb-2">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-semibold mt-3 mb-2">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="whitespace-pre-wrap wrap-break-word mb-3">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc pl-5 space-y-1 my-2">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-5 space-y-1 my-2">{children}</ol>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-5 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                <table className="w-full min-w-125 border-collapse text-xs text-left">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-gray-100 dark:bg-white/8 text-sm">
                {children}
              </thead>
            ),
            tbody: ({ children }) => (
              <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                {children}
              </tbody>
            ),
            tr: ({ children }) => (
              <tr className="transition-colors hover:bg-blue-50/70 dark:hover:bg-white/4">
                {children}
              </tr>
            ),
            th: ({ children }) => (
              <th className="px-4 py-3.5 font-semibold text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-white/10 whitespace-nowrap">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-4 py-3 leading-6 text-gray-700 dark:text-gray-300 align-top">
                {children}
              </td>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-500 hover:text-indigo-700 inline-flex items-center gap-1 underline"
              >
                {children}
                <ExternalLink size={14} />
              </a>
            ),
            code: ({ className, children }) => {
              const value = String(children).trim();
              if (!className) {
                return (
                  <code className="px-1.5 py-0.5 rounded bg-white/10 text-indigo-500">
                    {value}
                  </code>
                );
              }
              const language = className?.replace("language-", "") || "";
              return (
                <div className="my-4 overflow-hidden rounded-xl border border-white/10 bg-[#111318]">
                  <div className="flex items-center justify-between bg-[#1b1b24] border-b border-white/10 px-4 py-2">
                    <span className="uppercase text-xs text-gray-400">
                      {language}
                    </span>
                    <button
                      onClick={() => copyToClipBoard(value)}
                      className="flex items-center text-xs gap-0.5"
                    >
                      {copyCode === value ? (
                        <>
                          <Check size={12} /> Copied
                        </>
                      ) : (
                        <>
                          <Copy size={12} /> Copy
                        </>
                      )}
                    </button>
                  </div>
                  <SyntaxHighlighter language={language}
                  style={oneDark}
                  wrapLongLines
                  showLineNumbers
                  customStyle={{
                    margin: 0,
                    padding: "16px",
                    backgroundColor: "#0d1117",
                    fontSize: "14px",
                  }}
                  >
                    {value}
                  </SyntaxHighlighter>
                </div>
              );
            },
          }}
        >
          {content}
        </Markdown>
      </div>
      {lightBox && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6 backdrop-blur-sm"
          onClick={() => setLightBox(null)}
        >
          <button
            onClick={() => setLightBox(null)}
            className="absolute top-5 right-5 text-white/80 hover:text-white rounded-full p-2"
          >
            <X />
          </button>
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
