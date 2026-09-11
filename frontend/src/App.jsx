import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, googleProvider } from '../utils/firebase.js'
import api from '../utils/axios.js'

const App = () => {

  const handleLogin = async (token) => {
    try {
      const {data} = await api.post("/auth/login",{token})
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const googleLogin = async () => {
    const data = await signInWithPopup( auth, googleProvider )
    const token = await data.user.getIdToken()
    await handleLogin(token)
  }


  return (
    <div className='w-full h-screen bg-black flex justify-center items-center'>
      <button onClick={googleLogin} className='w-50 h-20 bg-white rounded-2xl hover:bg-amber-100'>Continue with Google</button>
    </div>
  )
}

export default App
