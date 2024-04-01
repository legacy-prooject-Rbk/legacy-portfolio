"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

interface PortfolioItem {
    id: Number;
    fullName: string;
    email: string;
    profession: string;
    bio: string;
    city: string;
    photo: File | null;
    backgroundImage: File | null;
    Interests: [];
    Contacts: []
}


function Profile() {
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        fetchPortfolio();
    }, [])

    const fetchPortfolio = async () => {
        try {
            const { data } = await axios('http://127.0.0.1:3000/api/portfolio/user/' + userId)
            setPortfolio(data)
        } catch (error) {
            alert('Error fetching Portfolio ❌')
            console.log('Error fetching Portfolio ❌\n', error);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="flex justify-center mt-2 mx-auto font-[Overpass]">
                {portfolio &&
                    <div className="w-[700px] mx-auto my-3 rounded border-[1px] border-[#909090] overflow-hidden shadow-md bg-white">
                        <div
                            style={{ backgroundImage: `url(${portfolio.backgroundImage})`, backgroundSize: 'cover' }}
                            className="flex bg-center justify-center items-center bg-gray-100 h-80 "
                        >
                            <img
                                src={portfolio.photo }
                                alt=""
                                className="w-36 h-36 rounded-full object-cover bg-center translate-y-[50px] mr-96 mb-64"
                            />
                        </div>
                        <div className="p-3 mt-[50px]">
                            <h2 className="text-center text-2xl mt-3 text-orange-400 font-bold capitalize ">{portfolio.fullName}</h2>
                            <h3 className="text-center text-gray-600 mt-1 font-medium">{portfolio.profession}</h3>
                            <div className="grid grid-cols-2 mt-2 divide-x">
                                <div className="mt-4 px-3 text-[18px]">
                                    <ul className="divide-y">
                                        <li className="text-gray-700">📧 {portfolio.email}</li>
                                        <li className="text-gray-600 mt-2">📍 {portfolio.city}</li>
                                    </ul>
                                </div>
                                <div className="px-3 flex flex-wrap py-3">
                                    {/* {portfolio.Interests.map((item, i) => (
                            <div
                                key={`interests${i}`}
                                className="interest-tag"
                            >
                                {item.name}
                            </div>
                        ))} */}
                                </div>
                            </div>
                            <div className="grid gap-1 mt-2 divide-x">
                                <p className="text-gray-600 p-3 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300">
                                    {portfolio.bio}
                                </p>
                                <div className="user-socials py-3">
                                    {/* {portfolio.Contacts && portfolio.Contacts.map(item => (
                            <div key={item.id} className="user-social">
                                <img src={`http://127.0.0.1:3000/socials/${item.icon}`} alt="" />
                                <div className="user-contact">{item.Contact.value}</div>
                            </div>
                        ))} */}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Profile