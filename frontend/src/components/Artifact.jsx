import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Check,
  Code,
  Code2,
  Copy,
  Eye,
  PanelLeftClose,
  PanelRightClose,
  Presentation,
} from "lucide-react";
import { useSelector } from "react-redux";
import preview from "../assets/preview.js";
import Editor from "@monaco-editor/react";

const Artifact = () => {
  const [collapse, setCollapse] = useState(false);
  const [tab, setTab] = useState("preview");
  const [activeFile, setActiveFile] = useState(0);
  const [copied, setCopied] = useState(false);
  const { artifacts } = useSelector((state) => state.message);

  if (!artifacts?.length) return null;

  const file = artifacts[0]?.files[activeFile];
  const htmlFile = artifacts[0]?.files?.find(
    (file) => file.name === "index.html",
  );
  const cssFile = artifacts[0]?.files?.find(
    (file) => file.name === "style.css",
  );
  const jsFile = artifacts[0]?.files?.find((file) => file.name === "script.js");

  const canPreview = Boolean(htmlFile); // returns 'yes' if there is an HTML file, otherwise 'no'

  const previewDoc = preview(htmlFile, cssFile, jsFile);

  // To copy
  const handleCopy = async () => {
    await navigator.clipboard.writeText(file?.content || "");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const detectLanguage = (fileName = "") => {
    const name = fileName.toLowerCase();
    const extension = name.split(".").pop();

    switch (extension) {
      case "html":
        return "html";
      case "css":
        return "css";
      case "js":
        return "javascript";
      case "jsx":
        return "javascript";
      case "ts":
        return "typescript";
      case "tsx":
        return "typescript";
      case "json":
        return "json";
      case "py":
        return "python";
      default:
        return "plaintext";
    }
  };

  return (
    <motion.div
      initial={{ width: 400 }}
      animate={{ width: collapse ? 40 : 400 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="hidden lg:flex h-full border-2 border-white/6 flex-col overflow-hidden shrink-0 w-62.5"
    >
      {!collapse ? (
        <div className="flex flex-col h-full bg-neutral-900">
          <div className="h-14 px-4 border-b border-white/6 flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCollapse(!collapse)}
              className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 transition-all duration-200 bg-transparent border-none cursor-pointer shrink-0"
            >
              <PanelRightClose size={16} />
            </button>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="flex items-center justify-center w-6 h-6 rounded-md bg-stone-800 shrink-0">
                <Code2 className="text-indigo-400" size={12} />
              </div>
              <div className="text-sm font-medium text-slate-300 truncate">
                {artifacts[0]?.title}
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={handleCopy} className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg transition-colors duration-150 cursor-pointer">
                {copied ? <Check size={15} />: <Copy size={15} />}
              </button>
            </div>
            {/* code and preview buttons */}
            {canPreview && (
              <div className="flex items-center gap-1 bg-white/4 border border-white/6 p-1 rounded-lg">
                <button
                  onClick={() => setTab("code")}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors duration-150 cursor-pointer ${tab === "code" ? "bg-indigo-500 text-white" : "text-slate-500 hover:text-slate-200"}`}
                >
                  <Code size={12} />
                  code
                </button>
                <button
                  onClick={() => setTab("preview")}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors duration-150 cursor-pointer ${tab === "preview" ? "bg-indigo-500 text-white" : "text-slate-500 hover:text-slate-200"}`}
                >
                  <Eye size={12} />
                  preview
                </button>
              </div>
            )}
          </div>
          {/* to map files */}
          {tab === "code" && (
            <div className="flex h-auto border-b border-white/6 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden shrink-0">
              {artifacts[0]?.files?.map((file, idx) => (
                <button
                  key={idx}
                  className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-r border-white/5 relative cursor-pointer rounded-lg ${activeFile === idx ? "text-blue-600 bg-neutral-800" : "text-slate-500 hover:text-slate-300 bg-transparent"}`}
                  onClick={() => setActiveFile(idx)}
                >
                  {file?.name}
                  {activeFile === idx && (
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-blue-600 rounded-t-lg"></div>
                  )}
                </button>
              ))}
            </div>
          )}
          {/* Code editor */}
          <div className="flex-1 overflow-hidden">
            {tab === "preview" && canPreview ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                translate={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <iframe
                  title="preview"
                  srcDoc={previewDoc}
                  sandbox="allow-scripts"
                  className="w-full h-full bg-white"
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                translate={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <Editor
                  theme="vs-dark"
                  height="100%"
                  width="100%"
                  language={detectLanguage(
                    file?.name,
                  )}
                  value={file?.content || ""}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 13,
                    wordwrap: "on",
                    renderLineHighlight: "none",
                    lineNumbers: "on",
                    glyphMargin: false,
                    folding: false,
                    padding: { top: 16, bottom: 16 },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </motion.div>
            )}
          </div>
        </div>
      ) : (
        <div className="hidden lg:flex flex-col h-full bg-neutral-900 items-center justify-center gap-3 py-4 shrink-0">
          <button
            onClick={() => setCollapse(!collapse)}
            className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-slate-200 transition-all duration-200 bg-transparent border-none cursor-pointer shrink-0"
          >
            <PanelLeftClose size={16} />
          </button>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div
              className="text-xs font-medium text-slate-500 tracking-widest uppercase whitespace-nowrap overflow-hidden text-ellipsis"
              style={{
                writingMode: "vertical-lr",
                transform: "rotate(180deg)",
              }}
            >
              {artifacts[0]?.title}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Artifact;
