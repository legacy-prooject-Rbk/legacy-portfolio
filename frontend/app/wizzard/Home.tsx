import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import type { NextPage } from "next";

interface Portfolio {
  id: number;
  fullName: string;
  photo: string;
  city?: string;
  email?: string;
}

const Home: NextPage = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [cards, setCards] = useState<Portfolio[]>([]);
  const [query, setQuery] = useState<string>("");
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [suggestions, setSuggestions] = useState<Portfolio[]>([]);

  return <div></div>;
};
export default Home;
