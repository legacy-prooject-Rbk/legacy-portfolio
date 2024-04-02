import React, { useEffect, useState } from "react";
import axios from "axios";

interface Interest {
  name: string;
}

interface Contact {
  id: number;
  icon: string;
  value: string;
}

interface PortfolioItem {
  id: number;
  fullName: string;
  photo: string;
  profession: string;
  email: string;
  city: string;
  bio: string;
  backgroundImage: string;
  Interests: Interest[];
  Contacts: Contact[];
}

const PortfolioDetails: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        const response = await axios.get<PortfolioItem[]>(
          "http://localhost:3000/api/portfolio"
        );
        setPortfolioItems(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPortfolioItems();
  }, []);

  return <div></div>;
};

export default PortfolioDetails;
