'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';


type Interest = {
  id: number;
  name: string;
};
type Props = {
  queryParams: String;
  };

 
  
  const Interests: React.FC <Props>= (queryParams) => {
    console.log(queryParams.searchParams)
    const searchParams = queryParams.searchParams
  const [interests, setInterests] = useState<Interest[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);;
  const router = useRouter();

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const res = await fetch('http://127.0.0.1:3000/api/interest');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const interestsData: Interest[] = await res.json();
        setInterests(interestsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchInterests();
  }, []);

  const handleInterestToggle = (interest: Interest) => {
    setSelectedInterests(currentSelectedInterests => {
      const isAlreadySelected = currentSelectedInterests.includes(interest.name);
      if (isAlreadySelected) {
        // If the interest's name is already selected, remove it from the selection
        return currentSelectedInterests.filter(name => name !== interest.name);
      } else {
        // If the interest's name is not selected, add it to the selection
        return [...currentSelectedInterests, interest.name];
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
    <h2 className="text-2xl font-bold mb-4">Select your interests:</h2>
    <ul className="grid grid-cols-2 gap-4">
      {interests.map(interest => (
        <li key={interest.id}>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectedInterests.includes(interest.name)}
              onChange={() => handleInterestToggle(interest)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2">{interest.name}</span>
          </label>
        </li>
      ))}
    </ul>
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Select your interests:</h3>
      <ul>
        {selectedInterests.map(name => (
          <li key={name} className="mb-2">
            {name}
          </li>
        ))}
      </ul>
    </div>
    <Link href={{ pathname: '/contacts', query: { ...searchParams, Interests: selectedInterests } }}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          NEXT
        </button>
      </Link>
  </div>
);
};



  
export default Interests;
