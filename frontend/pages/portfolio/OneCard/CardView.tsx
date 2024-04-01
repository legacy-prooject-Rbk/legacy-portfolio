import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
// Define TypeScript interfaces for the card data
interface Card {
  photo: string;
  fullName: string;
  profession: string;
  bio: string;
  email: string;
  city: string;
}

const CardView: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchAllCards();
  }, [success]);

  const fetchAllCards = () => {
    axios.get<Card[]>('http://localhost:3000/api/portfolio')
      .then(response => {
        setCards(response.data);
        setSuccess(true);
      })
      .catch(error => {
        console.error(error);
        setSuccess(false);
      });
  };

  return (
    <div>
      {cards.map((card, index) => (
        <div key={index} className="flex flex-wrap justify-between px-10 pb-10">
          <div className="max-w-xl mx-auto my-10 rounded-lg overflow-hidden shadow-md bg-white transition duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105">
            <div className="flex justify-center items-center h-24 bg-gray-100">
              <Image
                src={card.photo}
                alt=""
                className="object-cover w-20 h-20 rounded-full"
              />
            </div>
            <div className="p-6">
              <h2 className="text-center text-2xl mt-3 text-orange-400 font-bold">{card.fullName}</h2>
              <h3 className="text-center text-gray-600 mt-1 font-medium">{card.profession}</h3>
              <p className="text-gray-600 mt-3">{card.bio}</p>
              <div className="mt-4">
                <ul>
                  <li className="flex items-center text-gray-600"> {card.email}</li>
                  <li className="flex items-center mt-2 text-gray-600"> {card.city}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardView;
