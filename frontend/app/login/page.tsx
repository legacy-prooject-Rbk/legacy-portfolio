"use client"



import React,{useState} from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
function Login() {


    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
   
    // const { id } = useParams();
    const router = useRouter()
    function generateRandomNumber() {

      localStorage.setItem("code",Math.floor(Math.random() * 10000)); 
    }
    
  
    const sendsms = () => {
    
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "App d1042f2ad1f68a7b808591ac06fd727a-d315c77c-431c-4099-bc6c-e283a9ef4d6a");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
  
      const raw = JSON.stringify({
        "messages": [
          {
            "destinations": [{ "to": "21694289822" }],
            "from": "ProPlex",
            "text": `Hello ${username}, here is your verification code ${localStorage.getItem("code")}  `
          }
        ]
      });
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
  
      fetch("https://1vnzkn.api.infobip.com/sms/2/text/advanced", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    }
  
  
    const login = async (username:String, password:String) => {
      console.log(username, password);
      try {
        const result = await axios.post("http://localhost:3000/api/users/signin", {
          username: username,
          password: password
        })
      
       sendsms()
       router.push("/verify")
        console.log(result)
        const token = result.data.token
        const id = result.data.payload.userId
        localStorage.setItem("token", token)
        localStorage.setItem("userId", id)
  
        // const Portfolio = await axios.get(`http://localhost:3000/api/portfolio/user/${id}`)
        // // to get the profile  of an user 
  
        // console.log(Portfolio)
   
        // if (!Portfolio.data) {                /// if the user has no profile he needs to  create a profile 
        //   router.push("/profile/createProfile")
        // }
        // else if (Portfolio.data) {               /// if  the user has a profile he will be directed to it 
        //   router.push("/profile")
        // }
      } catch (error) {
        alert("check your information and try again")
        console.log(error)
  
      }
    }
  


  return (
  
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="mx-auto w-[550px] border-[1px] p-8">
      <div className="flex flex-col items-center">
        <div className="m-1 bg-orange-500 rounded-full p-3 text-white"></div>
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <div className="w-full mb-4">
          <label htmlFor="username" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">UserName</label>
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
          className="w-full bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            generateRandomNumber()
            login(username, password);
          }}
        >
          Sign In
        </button>
        <div className="mt-4 text-gray-700 text-sm text-right">
          <span className="cursor-pointer hover:text-blue-600" onClick={() => router.push("/signup")}>Don't have an account? Sign up</span>
        </div>
      </div>
    </div>
  </div>
  
    )
  
}

export default Login