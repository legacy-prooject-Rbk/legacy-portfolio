import React from 'react'
import Navbar from '../../components/Navbar'

   
  export default async function Page({params}:{params:{id:number}}) {
    async function getData() {
        const res = await fetch( "http://127.0.0.1:3000/api/portfolio/user/"+params.id ,  {cache:"no-cache" }) 
     
        if (!res.ok) {
          
          throw new Error('Failed to fetch data')
        }
       
        return(
          
          res.json()
        ) 
      }
   
   
  const data = await getData()

    return (
        <div>
        <Navbar />
        <div className="flex justify-center mt-2 mx-auto font-[Overpass]">
          {data && (
            <div className="w-[700px] mx-auto my-3 rounded border-[1px] border-[#909090] overflow-hidden shadow-md bg-white">
              <div
                style={{
                  backgroundImage: `url(${data.backgroundImage})`,
                  backgroundSize: "cover",
                }}
                className="flex bg-center justify-center items-center bg-gray-100 h-80 "
              >
                <img
                  src={data.photo as any}
                  alt=""
                  className="w-36 h-36 rounded-full object-cover bg-center translate-y-[50px] mr-96 mb-64"
                />
              </div>
              <div className="p-3 mt-[50px]">
                <h2 className="text-center text-2xl mt-3 text-orange-400 font-bold capitalize ">
                  {data.fullName}
                </h2>
                <h3 className="text-center text-gray-600 mt-1 font-medium">
                  {data.profession}
                </h3>
                <div className="grid grid-cols-2 mt-2 divide-x">
                  <div className="mt-4 px-3 text-[18px]">
                    <ul className="divide-y">
                      <li className="text-gray-700">📧 {data.email}</li>
                      <li className="text-gray-600 mt-2">📍 {data.city}</li>
                    </ul>
                  </div>
                  <div className="mt-4 flex flex-wrap">
                    {data.Interests &&
                      data.Interests.map((item, i) => (
                        <div key={`interests${i}`} className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2
                        ">
                          {item.name}
                        </div>
                      ))}
                  </div>
                </div>
                <div className="grid gap-1 mt-2 divide-x">
                  <p className="text-gray-600 p-3 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300">
                    {data.bio}
                  </p>
                  <div className="mt-6 flex flex-wrap space-x-5 ">
    {data.Contacts &&
      data.Contacts.map((contact) => (
        <div key={contact.id} className="user-social">
          <img
            src={`http://127.0.0.1:3000/socials/${contact.icon}`}
            alt={contact.name}
            className="w-12 h-12" 
          />
          <div className="user-contact">{contact.name}</div>
        </div>
      ))}
  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }