"use client"



import React ,{useState} from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'



function page() {
    const [verificationCode,setVerificationCode]=useState<Number>(0)
    const router = useRouter()

    const verify = async (code:Number)=>{
      
      try{
    const verification  = localStorage.getItem("code")
    const id = localStorage.getItem("userId")
    console.log(id)
   if(code===verification){
      const Portfolio = await axios.get(`http://localhost:3000/api/portfolio/user/${id}`)
      // to get the profile  of an user 
  
      console.log(Portfolio)
  
      if (!Portfolio.data) {                /// if the user has no profile he needs to  create a profile 
        router.push("/profile/createProfile")
      }
      else if (Portfolio.data) {               /// if  the user has a profile he will be directed to it 
        router.push(`/profile${id}`)
      }
    }
  } catch (error) {
      alert("check your information and try again")
      console.log(error)
  
   }
    }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      
  <div className="mt-8   w-[400px] flex flex-col items-center">
    <div className="w-full mb-4">
      
      <label htmlFor="verificationCode" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Verification Code</label>
      <input
        id="verificationCode"
        type="text"
        className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        placeholder="Verification Code"
        onChange={(e) => setVerificationCode(e.target.value)}
      />
    </div>
    <button
      type="button"
      className="w-full bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => {
        verify(verificationCode)
      }}
    >
      Sign In
    </button>
  </div>
</div>
  )
}

export default page