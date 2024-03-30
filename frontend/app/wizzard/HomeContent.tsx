"use client";

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
    const fetchAllCards = async () => {
      try {
        const response = await axios.get<Portfolio[]>('http://localhost:3000/api/portfolio');
        setPortfolio(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchAllCards();
  }, []);

  const onSuggestHandler = (fullName: string) => {
    setQuery(fullName);
    setSuggestions([]);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.length > 0) {
      const regex = new RegExp(`${newQuery}`, "gi");
      const matches = portfolio.filter(user => user.fullName.match(regex));
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
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
    <div></div>
  );
};

export default HomeContent;
