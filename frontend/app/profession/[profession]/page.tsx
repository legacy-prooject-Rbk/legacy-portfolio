"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface PortfolioItem {
  id: number;
  fullName: string;
  email: string;
  city: string;
  bio: string;
}

interface PortfolioPageProps {
  params: {
    profession: string;
  };
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ params }) => {
  const { profession } = params;
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    if (profession) {
      axios
        .get<PortfolioItem[]>(
          `http://localhost:3000/api/portfolio/byProfession/${encodeURIComponent(
            profession
          )}`
        )
        .then((response) => {
          setPortfolios(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [profession]);

  if (profession && !portfolios.length) {
    return (
      <div className="text-center py-10">
        <p>No portfolio items found for the profession: {decodeURIComponent(profession)}.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {portfolios.map((portfolio) => (
        <div key={portfolio.id} className="border shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-100">
            <h2 className="text-xl font-semibold">{portfolio.fullName}</h2>
            <p className="text-gray-600">{portfolio.email}</p>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-700">{portfolio.bio}</p>
            <p className="text-sm text-gray-500">{portfolio.city}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortfolioPage;
