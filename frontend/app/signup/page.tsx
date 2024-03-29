"use client"

import React,{useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
function Signup() {
   
  const[username,setUsername]=useState<String>("")
  const[password,setPassword]=useState<String>("")

  console.log(username,password)

const router = useRouter()


  const create = (username:String  ,password:String)=>{
    axios.post("http://localhost:3000/api/users/signup",{
      username:username,
      password:password
    }).then((result)=>{
      console.log(result)
      router.push("/login")
    }).catch((error)=>{
      console.log(error)
    })
  }
  return (
  < div className="mx-auto max-w-xs">
      <div className="mt-8 flex flex-col items-center">
        <div className="m-1 bg-blue-500 rounded-full p-3 text-white">
         
        </div>
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <div className="w-full mb-4">
          <label htmlFor="username" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Username</label>
          <input
            id="username"
            type="text"
            className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="w-full mb-6">
          <label htmlFor="password" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Password</label>
          <input
            id="password"
            type="password"
            className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            create(username, password);
          }}
        >
          Sign Up
        </button>
        <div className="mt-4 text-gray-700 text-sm text-right">
          <span className="cursor-pointer hover:text-blue-600" onClick={() => router.push("/login")}>
            Already have an account ? sign in 
          </span>
        </div>
      </div>
    </div>
  )
}

export default Signup