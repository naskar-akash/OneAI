import React, { useState, useEffect } from "react";
import {
  BadgeIndianRupee,
  CoinsIcon,
  LogOut,
  MessageSquare,
  PanelLeftIcon,
  PanelRight,
  PenSquare,
  Plus,
  User,
} from "lucide-react";
import { createConversation } from "../features/createConversation.js";
import { getConversations } from "../features/getConversations.js";
import { useDispatch, useSelector } from "react-redux";
import {
  addConversations,
  setConversations,
  setSelectedConversation,
} from "../redux/conversationSlice";
import { logout } from "../features/logout.js";
import { setUserdata } from "../redux/userSlice.js";

const LeftBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const dispatch = useDispatch();
  const { conversations, selectedConversation } = useSelector(
    (state) => state.conversation,
  );
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const getConv = async () => {
      const data = await getConversations();
      dispatch(setConversations(data));
    };
    getConv();
  }, [userData?._id]);

  const handleCreateConversation = async () => {
    const data = await createConversation();
    dispatch(addConversations(data));
  };

  const handleLogout = async () => {
    const data = await logout();
    dispatch(setUserdata(null));
  };

  if (collapsed) {
    return (
      <div className="hidden lg:flex flex-col items-center w-14 h-screen border-r bg-neutral-900 border-white/6 py-4 gap-1 shrink-0">
        {/* Panel button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors duration-150 bg-transparent border-none cursor-pointer"
        >
          <PanelRight />
        </button>
        {/* New Chat button */}
        <button
          onClick={handleCreateConversation}
          className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors duration-150 bg-transparent border-none cursor-pointer"
        >
          <Plus />
        </button>
        {/* Chats */}
        <div className="flex-1 overflow-y-auto px-2.5 pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden pt-5">
          {conversations.map((conv, i) => {
            const isActive = selectedConversation?._id == conv?._id;
            return (
              <div
                onClick={() => dispatch(setSelectedConversation(conv))}
                key={i}
                className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-2 py-2 rounded-lg border transition-colors duration-150 ${isActive ? "bg-indigo-600/10 border-indigo-500/18" : "bg-transparent border-transparent"}`}
              >
                <div
                  className={`flex items-center justify-center shrink-0 w-6 h-6 rounded-lg transition-colors duration-150 ${isActive ? "bg-indigo-500/15 text-indigo-400" : "bg-white/5 text-slate-500"}`}
                >
                  <MessageSquare size={15} />
                </div>
              </div>
            );
          })}
        </div>
        {/* Avatar */}
        <div className="relative shrink-0">
          {userData?.avatar && !imgErr ? (
            <img
              src={userData?.avatar}
              alt="Avatar"
              className="w-8 h-8 rounded-xl object-cover border-2 border-indigo-500/25"
              onError={() => setImgErr(true)}
            />
          ) : (
            <div className="w-9 h-9 rounded-xlbg-white/6 flex items-center justify-center">
              <User size={18} className="text-slate-400" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed lg:static inset-y-0 left-0 z-50 w-67.5 h-screen shrink-0 bg-neutral-900 border-r-2 border-white/6">
      <div className="flex flex-col h-full">
        {/* Header div */}
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/12">
          <div
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors duration-150 bg-transparent border-none cursor-pointer"
            onClick={() => setCollapsed(!collapsed)}
          >
            <PanelLeftIcon />
          </div>
          <span className="text-md font-semibold text-slate-100 tracking-tight flex-1">
            OneAI
          </span>
          <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide">
            free
          </span>
          <button
            className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors duration-150 bg-transparent border-none cursor-pointer"
            onClick={handleCreateConversation}
          >
            <PenSquare size={14} />
          </button>
        </div>

        {/* New Chat button */}
        <div className="px-4 pt-4 pb-2">
          <button
            className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-linear-to-br from-indigo-500 to-purple-700 rounded-xl py-2.5 border-none cursor-pointer hover:opacity-90 transition-opacity duration-150"
            onClick={handleCreateConversation}
          >
            <Plus size={15} /> New Chat
          </button>
        </div>

        {/* Conversations */}
        {conversations.length == 0 ? (
          <div className="px-5 pt-4 pb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
            No recent conversations
          </div>
        ) : (
          <div className="px-5 pt-4 pb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Recents
          </div>
        )}
        <div className="flex-1 overflow-y-auto px-2.5 pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden">
          {conversations.map((conv, i) => {
            const isActive = selectedConversation?._id == conv?._id;
            return (
              <div
                onClick={() => dispatch(setSelectedConversation(conv))}
                key={i}
                className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5 rounded-lg border transition-colors duration-150 ${isActive ? "bg-indigo-600/10 border-indigo-500/18" : "bg-transparent border-transparent"}`}
              >
                <div
                  className={`flex items-center justify-center shrink-0 w-7 h-7 rounded-lg transition-colors duration-150 ${isActive ? "bg-indigo-500/15 text-indigo-400" : "bg-white/5 text-slate-500"}`}
                >
                  <MessageSquare size={15} />
                </div>
                <span
                  className={`text-sm font-medium truncate ${isActive ? "text-slate-100" : "text-slate-400"}`}
                >
                  {conv.title || "New Chat"}
                </span>
              </div>
            );
          })}
        </div>

        {/* divider */}
        <div className="mx-2.5 h-px bg-white/12" />
        {/* Footer */}
        <div className="px-5 py-3">
          {userData ? (
            <div className="flex items-center gap-2.5 cursor-pointer rounded-xl p-3 hover:bg-white/5 transition-colors duration-150">
              {/* Avatar */}
              <div className="relative shrink-0">
                {userData?.avatar && !imgErr ? (
                  <img
                    src={userData?.avatar}
                    alt="Avatar"
                    className="w-9 h-9 rounded-xl object-cover border-2 border-indigo-500/25"
                    onError={() => setImgErr(true)}
                  />
                ) : (
                  <div className="w-9 h-9 rounded-xlbg-white/6 flex items-center justify-center">
                    <User size={18} className="text-slate-400" />
                  </div>
                )}
              </div>
              {/* Username and plan */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-100 truncate">
                  {userData?.name || "User"}
                </p>
                <p className="text-xs text-slate-500 mt-px">{"Free Plan"}</p>
              </div>
              {/* Credits and coins */}
              <div className="flex gap-1">
                <button className="flex items-center justify-center w-7 h-7 roounded-sm border-none bg-transparent text-yellow-600 cursor-pointer hover:text-yellow-300 transition-all duration-150">
                  <BadgeIndianRupee size={18} />
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center w-7 h-7 roounded-sm border-none bg-transparent text-gray-600 cursor-pointer hover:text-gray-400 transition-all duration-150"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          ) : (
            <button className="w-full flex items-center justify-center gap-2 text-sm font-medium text-slate-200 bg-white/5 border-white/10 rounded-xl py-3 cursor-pointer hover:bg-white/8 transition-colors duration-150">
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
