"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ContactModal from "../components/ContactModal";

interface Interest {
  id: number;
  name: string;
}

type Contact = {
    id: number;
    name: string;
  icon : string;
  link :  string
  };

interface PortfolioItem {
  id: Number;
  fullName: string;
  email: string;
  profession: string;
  bio: string;
  city: string;
  photo: File | null;
  backgroundImage: File | null;
  Interests: Interest[];
  Contacts: Contact[];
}

function Profile() {
  const [portfolio, setPortfolio] = useState<PortfolioItem>();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const { data } = await axios(
        "http://127.0.0.1:3000/api/portfolio/user/" + userId
      );
      setPortfolio(data);
      console.log("from profile tsx", data);
    } catch (error) {
      alert("Error fetching Portfolio ❌");
      console.log("Error fetching Portfolio ❌\n", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center mt-8 h-auto">
        {portfolio && (
          <div className="w-[700px] mx-auto bg-white shadow-md rounded-lg overflow-hidden border-[1px] border-[#E24724]">
            <div
              className="bg-gray-200 bg-cover bg-center h-64 flex items-center justify-center"
              style={{ backgroundImage: `url(${portfolio.backgroundImage})` }}
            >
              <img
                src={portfolio.photo || ""}
                alt=""
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 capitalize text-center">
                {portfolio.fullName}
              </h2>
              <p className="text-sm text-gray-600 text-center">{portfolio.profession}</p>
              <div className="mt-4">
                <p className="text-gray-700">
                  📧 {portfolio.email}
                  <br />
                  📍 {portfolio.city}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap">
                {portfolio.Interests.map((item, i) => (
                  <div
                    key={i}
                    className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                  >
                    {item.name}
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <p className="text-gray-700">{portfolio.bio}</p>
              </div>
              <div className="mt-6 flex flex-wrap">
                {portfolio.Contacts.map((contact, index) => (
                  <div key={index} className="mr-4 flex items-center flex-wrap">
                    <img
                      src={`http://127.0.0.1:3000/socials/${contact.icon}`}
                      alt={contact.name}
                      className="w-8 h-8 mr-2"
                    />
                    <a
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-blue-500"
                    >
                      {contact.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
