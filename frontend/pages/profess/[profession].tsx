import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

interface PortfolioItem {
  id: number;
  fullName: string;
  email: string;
  city: string;
  bio: string;
}

const PortfolioPage: React.FC = () => {
  const router = useRouter();
  console.log('Router', router.query);

  const { profession } = router.query as { profession: string };
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
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [profession]);

  if (!portfolios.length) {
    return (
      <div>No portfolio items found for the profession: {profession}.</div>
    );
  }

  return (
    <div>
      {portfolios.map((portfolio) => (
        <div key={portfolio.id}>
          <h2>{portfolio.email}</h2>
          <h2>{portfolio.fullName}</h2>
        </div>
      ))}
    </div>
  );
};

export default PortfolioPage;
