import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, googleProvider } from '../utils/firebase'

const App = () => {

  const googleLogin = async () => {
    const data = await signInWithPopup( auth, googleProvider )
    console.log(data)
  }


  return (
    <div className='w-full h-screen bg-black flex justify-center items-center'>
      <button onClick={googleLogin} className='w-50 h-20 bg-white rounded-2xl hover:bg-amber-100'>Continue with Google</button>
    </div>
  )
}

export default App
