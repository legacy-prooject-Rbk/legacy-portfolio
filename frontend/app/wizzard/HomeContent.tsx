
"use client"

import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import type { NextPage } from 'next';

interface Portfolio {
  id: number;
  fullName: string;
  photo: string;
  city?: string;
  email?: string;
}

const HomeContent: NextPage = () => {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [cards, setCards] = useState<Portfolio[]>([]);
  const [query, setQuery] = useState<string>('');
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [suggestions, setSuggestions] = useState<Portfolio[]>([]);

  useEffect(() => {
    fetchAllCards();
  }, []);

  const fetchAllCards = async () => {
    try {
      const response = await axios.get<Portfolio[]>('http://localhost:3000/api/portfolio');
      setPortfolio(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSuggestHandler = (fullName: string) => {
    setQuery(fullName);
    setSuggestions([]);
  };



  const handleSearch = async () => {
    try {
      const response = await axios.post<Portfolio[]>('http://localhost:3000/api/portfolio/search', {
        query,
        city: selectedCity,
      });
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const cities = [
    'Ariana', 'Beja', 'Ben Arous', 'Bizerte', 'Gabes', 'Gafsa',
    'Jendouba', 'Kairouan', 'Kasserine', 'Kebili', 'Kef', 'Mahdia',
    'Manouba', 'Medenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid',
    'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan',
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="bg-transparent shadow-md py-4">
        <div className="container mx-auto flex justify-center items-center">
          <Image src="/images/pro.png" alt="ProPlex Logo" width={64} height={64} />
        </div>
      </header>

      <div className="flex justify-center items-center h-[500px]">
        <div className="p-6 bg-[#0101018a] rounded-lg">
          <h1 className="text-6xl font-bold mb-6">Discover Professionals near you</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 relative gap-4 items-center">
            <input
              type="text"
              value={query}
              placeholder="What are you looking for?"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
             
            />
            {suggestions.map((suggestion, i) => (
              <div
                className="absolute w-full top-full mt-1 rounded shadow bg-white"
                key={i}
            
              >
                {suggestion.fullName}
              </div>
            ))}

            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">...</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <button
              className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-700"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center text-black mb-10">DISCOVER Trends</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {cards.map((trend) => (
            <div key={trend.id} className="bg-white rounded-lg shadow-lg p-4 text-center mb-4">
              <Image src={trend.photo} alt={trend.fullName} width={80} height={80} />
              <h3 className="font-bold text-gray-800">{trend.fullName}</h3>
            </div>
          ))}
        </div>
      </div>

      
      </div>
    
  );
};

export default HomeContent;