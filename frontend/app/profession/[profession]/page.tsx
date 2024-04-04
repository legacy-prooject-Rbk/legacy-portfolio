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

// Add the correct props type for NextPage component with params
interface PortfolioPageProps {
  params: {
    profession: string;
  };
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ params }) => {
  // Destructure profession from params
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

  // Check for both the presence of profession and portfolios length
  if (profession && !portfolios.length) {
    return (
      <div>No portfolio items found for the profession: {decodeURIComponent(profession)}.</div>
    );
  }

  return (
    <div>
      {portfolios.map((portfolio) => (
        <div key={portfolio.id}>
          <h2>{portfolio.email}</h2>
          <h2>{portfolio.fullName}</h2>
          <p>{portfolio.bio}</p>
          <p>{portfolio.city}</p>
        </div>
      ))}
    </div>
  );
};

export default PortfolioPage;
