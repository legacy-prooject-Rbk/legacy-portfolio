
import { NextResponse } from "next/server"



import User from "../../../../backend/modules/user/model"
import { NextApiRequest, NextApiResponse } from "next";
// import  bcrypt from 'bcrypt';


export async function POST(username:String, password:String) {

   try{
     const result =   await  User.create({username:username,password:password})
     
     
     console.log(result)

   }catch(error) {
    console.log(error)
    console.log(username,password,"ghvjhgfvhjgcvjhgcjhgcjhgcjgcjhgchjcgjhcgjhcgjhcgjh")
   }

}



