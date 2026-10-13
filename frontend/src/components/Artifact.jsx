import React, { useState } from "react";
import { motion } from "motion/react";
import { Code2, PanelLeftClose, PanelRightClose } from "lucide-react";
import { useSelector } from "react-redux";

const Artifact = () => {
  const [collapse, setCollapse] = useState(false);
  const { artifacts } = useSelector((state) => state.message);

  if (artifacts.length == 0) return;

  return (
    <motion.div
      initial={{ width: 250 }}
      animate={{width: collapse ? 40 : 250}}
      transition={{duration: 0.3, ease: "easeInOut"}}
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
             style={{writingMode: "vertical-lr", transform: "rotate(180deg)"}}
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
