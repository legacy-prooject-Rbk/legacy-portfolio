"use client";
import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import Image from "next/image";
import type { NextPage } from "next";
import Link from "next/link";

// Defining the Portfolio interface for type-checking
interface Portfolio {
  id: number;
  fullName: string;
  photo: string;
  city?: string; // Optional property
  email?: string; // Optional property
}

const HomeContent: NextPage = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [cards, setCards] = useState<Portfolio[]>([]);
  const [query, setQuery] = useState<string>("");
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [suggestions, setSuggestions] = useState<Portfolio[]>([]);

  useEffect(() => {
    fetchAllCards();
  }, []);

  const fetchAllCards = async () => {
    try {
      const response = await axios.get<Portfolio[]>(
        "http://localhost:3000/api/portfolio"
      );
      setPortfolio(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSuggestHandler = (fullName: string) => {
    setQuery(fullName);
    setSuggestions([]);
  };

  const onChangeHandler = (Query: string) => {
    let matches: Portfolio[] = [];
    if (Query.length > 0) {
      const regex = new RegExp(`${Query}`, "gi");
      matches = portfolio.filter((user) => user.fullName.match(regex));
    }
    setSuggestions(matches);
    setQuery(Query);
  };

  // Function to handle search based on query and city
  const handleSearch = async () => {
    try {
      const response = await axios.post<Portfolio[]>(
        "http://localhost:3000/api/portfolio/search",
        {
          query,
          city: selectedCity,
        }
      );
      setCards(response.data);
      if (response.data.length === 0) {
        alert('No matching professionals or cities found.');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert('An error occurred while searching. Please try again.');
    }
  }
  const cities = [
    "Ariana",
    "Beja",
    "Ben Arous",
    "Bizerte",
    "Gabes",
    "Gafsa",
    "Jendouba",
    "Kairouan",
    "Kasserine",
    "Kebili",
    "Kef",
    "Mahdia",
    "Manouba",
    "Medenine",
    "Monastir",
    "Nabeul",
    "Sfax",
    "Sidi Bouzid",
    "Siliana",
    "Sousse",
    "Tataouine",
    "Tozeur",
    "Tunis",
    "Zaghouan",
  ];

  const trends = [
    {
      id: 1,
      fullName: "Software Engineer",
      photo:
        "/images/work-from-home.png",
    },
    {
      id: 2,
      fullName: "Teacher",
      photo:
        "/images/professeur.png",
    },
    {
      id: 3,
      fullName: "engineer",
      photo:
        "/images/ingenieur.png",
    },
    {
      id: 4,
      fullName: "Data Scientist",
      photo:
        "/images/data-scientist.png",
    },
    {
      id: 5,
      fullName: "Content Writer",
      photo:
        "https://as1.ftcdn.net/v2/jpg/02/30/60/82/1000_F_230608264_fhoqBuEyiCPwT0h9RtnsuNAId3hWungP.jpg",
    },
  ];
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      
      <header className="bg-white py-4 shadow">
        <div className="container mx-auto flex justify-center items-center">
          <Image
            src="/images/pro.png"
            alt="ProPlex Logo"
            width={128}
            height={64}
            priority
          />
        </div>
      </header>

      <div className="flex justify-center items-center h-[400px] bg-gray-50">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Discover Professionals Near You
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 relative gap-4 items-center">
            <input
              type="text"
              value={query}
              placeholder="What are you looking for?"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              onChange={(e) => onChangeHandler(e.target.value)}
            />
            <div className="absolute w-[200px] top-[100%] rounded shadow bg-white">
              {suggestions &&
                suggestions.map((suggestion, i) => {
                  return (
                    <div
                      className="px-2 py-1 hover:bg-[#f8f8f8] cursor-pointer"
                      onClick={() => {
                        onSuggestHandler(suggestion.fullName);
                      }}
                      key={i}
                    >
                      {suggestion.fullName}
                    </div>
                  );
                })}
            </div>

            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:ring-blue-500 focus:border-blue-500"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">Select a city...</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <button
              className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-700 transition ease-in duration-150"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {cards.length > 0 ? (
          cards.map((card) => (
            <Link key={card.id} href={`/portfolio/${card.id}`} passHref>
              <div className="bg-white rounded-xl overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl w-64"> {/* Adjusted width */}
                <Image
                  src={card.photo}
                  alt={card.fullName}
                  width={256} 
                  height={256} 
                  objectFit="cover"
                  className="rounded-t-xl"
                />
                <div className="px-6 py-4">
                  <h3 className="font-bold text-xl text-gray-800">{card.fullName}</h3>
                  <h3 className="font-bold text-xl text-gray-800">{card.city}</h3>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-600">No professionals found. Try a different search.</p>
        )}
      </div>
<div className="flex flex-wrap justify-center gap-4">
  {trends.map((trend) => (
    <Link key={trend.id} href={`/profession/${trend.fullName}`} >   
        <div className="bg-white rounded-lg shadow-lg p-4 text-center mb-4 cursor-pointer transform hover:scale-105 transition-transform duration-200">
          <Image
            src={trend.photo}
            alt={trend.fullName}
            width={80}
            height={80}
            objectFit="cover"
            className="rounded-full mx-auto"
          />
          <h3 className="font-bold text-gray-800 mt-2">{trend.fullName}</h3>
        </div>
      
    </Link>
  ))}
</div>
      
     
      </div>

   
  );
};

export default HomeContent;
