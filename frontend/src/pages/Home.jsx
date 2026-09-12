import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, googleProvider } from "../../utils/firebase.js";
import api from "../../utils/axios.js";
import { FcGoogle } from "react-icons/fc";

const Home = () => {
  // Function to handle login api
  const handleLogin = async (token) => {
    try {
      const { data } = await api.post("/api/auth/login", { token });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //   Function to google signup
  const googleLogin = async () => {
    const data = await signInWithPopup(auth, googleProvider);
    const token = await data.user.getIdToken();
    await handleLogin(token);
  };

  return (
    <div className="h-screen flex bg-gray-900 text-white overflow-hidden">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur">
        <div className="flex flex-col w-85 bg-mist-800 border border-white/10 rounded-2xl p-7 gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold text-slate-200 tracking-tight">
              Welcome to OneAI
            </h2>
            <p className="text-md text-slate-500">Please Login to continue</p>
          </div>
          <button className="flex justify-center items-center w-full gap-3 py-3 rounded-xl text-sm font-medium text-black/90 bg-gray-100 hover:bg-gray-200 shadow-lg shadow-stone-700 hover:shadow-neutral-600 transition-all duration-150 cursor-pointer" onClick={googleLogin}>
            <FcGoogle size={20} />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
