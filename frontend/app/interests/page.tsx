"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Interest {
  id: string;
  name: string;
}

interface InterestsProps {
  searchParams: string;
}

const Interests = ({ searchParams }: InterestsProps) => {
  const [interests, setInterests] = useState<Interest[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selected, setSelected] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const res = await fetch("http://127.0.0.1:3000/api/interest");

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const interestsData: Interest[] = await res.json();
        setInterests(interestsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchInterests();
  }, []);

  const handleInterestToggle = (interest: Interest) => {
    setSelectedInterests((currentSelectedInterests) => {
      const isAlreadySelected = currentSelectedInterests.includes(interest.id);
      if (isAlreadySelected) {
        // If the interest's name is already selected, remove it from the selection
        return currentSelectedInterests.filter((id) => id !== interest.id);
      } else {
        // If the interest's name is not selected, add it to the selection
        return [...currentSelectedInterests, interest.id];
      }
    });
  };

  const submitInterests = async () => {
    try {
      const userId = localStorage.getItem("userId");
      await axios.post("http://127.0.0.1:3000/api/interest/user/" + userId, {
        interests: selectedInterests,
      });
      setSelected([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center mt-2 mx-auto font-[Overpass]">
    <div className="container mx-auto px-4 py-8 w-[700px] my-3 rounded border-[1px] border-[#909090] overflow-hidden shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center text-orange-400">Select your interests:</h2>
      <ul className="grid grid-cols-2 gap-4">
        {interests.map((interest) => (
          <li key={interest.id} className="rounded border-[1px] border-gray-300 shadow-sm p-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedInterests.includes(interest.id)}
                onChange={() => handleInterestToggle(interest)}
                className="form-checkbox h-5 w-5 accent-orange-500"
              />
              <span className="ml-2 text-gray-700">{interest.name}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex justify-center">
        <Link
          href={{pathname: "/contacts"
            // pathname: "/contacts",
            , query: { ...searchParams, Interests: selectedInterests },
          }}
        >
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            onClick={submitInterests}
          >
            NEXT
          </button>
        </Link>
      </div>
    </div>
  </div>
);
};

export default Interests;
