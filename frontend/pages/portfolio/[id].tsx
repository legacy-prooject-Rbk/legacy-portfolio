import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import "tailwindcss/tailwind.css";
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
  const router = useRouter();
  const { id } = router.query;
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        const response = await axios.get<PortfolioItem[]>("http://localhost:3000/api/portfolio");
        setPortfolioItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchPortfolioItems();
  }, []);

  // Find the specific portfolio item once portfolioItems are loaded and id is available
  const portfolioItem = portfolioItems.find(
    (item) => item.id.toString() === id
  );

  if (!portfolioItem) {
    return <div>No portfolio item found</div>
  }

  return (
    <div className="flex justify-center mt-2 mx-auto font-overpass">
      <div className="w-full md:w-1/2 mx-auto my-3 rounded border border-gray-300 overflow-hidden shadow-lg bg-white">
        <div
          style={{
            backgroundImage: `url(${portfolioItem.backgroundImage})`,
            backgroundSize: "cover",
          }}
          className="h-32 bg-gray-100 flex justify-center items-center bg-center"
        >
          <Image
            src={portfolioItem.photo}
            alt={portfolioItem.fullName}
            width={144}
            height={144}
            className="rounded-full border-4 border-white -mt-16"
          />
        </div>
        <div className="pt-16 pb-6 px-6">
          <h2 className="text-center text-3xl text-orange-400 font-bold">
            {portfolioItem.fullName}
          </h2>
          <h3 className="text-center text-xl text-gray-600">
            {portfolioItem.profession}
          </h3>
          <p className="text-gray-600 mt-3">{portfolioItem.bio}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 divide-x divide-gray-300">
            <div className="px-4">
              <p className="text-gray-700">📧 {portfolioItem.email}</p>
              <p className="text-gray-600 mt-2">📍 {portfolioItem.city}</p>
            </div>
            <div className="px-4 flex flex-wrap">
              {portfolioItem.Interests &&
                portfolioItem.Interests.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-1"
                  >
                    {interest.name}
                  </span>
                ))}
            </div>

            <div className="px-4 py-2">
              {portfolioItem.Contacts &&
                portfolioItem.Contacts.map((contact) => (
                  <div key={contact.id} className="flex items-center mt-2">
                    <span className="ml-2">{contact.value}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetails;
