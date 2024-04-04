"use client"
import React, { useState, useEffect } from 'react';
//import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from "axios"
import ContactModal from '../components/ContactModal';

type Contact = {
  id: number;
  name: string;
icon : string;
link :  string
};

type Props = {
  searchParams: string; 
};

const Contacts: React.FC<Props> = ({ searchParams }) => {
  console.log('from contact page',searchParams)
  const [contacts, setContacts] = useState<Contact []>([]);
  const [selectedContact, setSelectedContact] = useState<Contact>();
  const userId = localStorage.getItem('userId')
  const fetchContacts = async () => {
    try {

      const res = await fetch('http://127.0.0.1:3000/api/SocialPlatform');
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const contacts = await res.json();
      setContacts(contacts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const submitContact = async (platformId: number, value: string) => {
    //console.log(Contact ID: ${platformId}, Value: ${value});
    try {
      const userId = localStorage.getItem('userId')
      console.log({ platformId, value });

     const {data} = await axios.post('http://127.0.0.1:3000/api/SocialPlatform/user/' + userId , { platformId, value })
console.log(data)
     // fetchPortfolio()
  } catch (error) {
      console.log(error);
  }
}

const onClose = () => {
  setSelectedContact(null);
};

  return (
    <div className="flex justify-center mt-2 mx-auto font-[Overpass]">
    <div className="container mx-auto px-4 py-8 w-[700px] my-3 rounded border-[1px] border-[#909090] overflow-hidden shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center text-orange-400">Contacts:</h2>
      <div className="flex flex-wrap justify-center">
        {contacts.map((contact) => (
          <div key={contact.id} className="m-4">
            <img
              src={`http://127.0.0.1:3000/socials/${contact.icon}`}
              alt={contact.name}
              className="rounded-full cursor-pointer shadow-sm"
              style={{ width: '60px', height: '60px' }}
              onClick={() => setSelectedContact(contact)}
            />
          </div>
        ))}
      </div>
      {selectedContact && (
        <ContactModal platform={selectedContact} submitContact={submitContact} onClose={onClose} />
      )}
      <div className="mt-8 flex justify-center">
        <Link href={`/profile/${localStorage.getItem('userId')}`}>
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
            Finish
          </button>
        </Link>
      </div>
    </div>
  </div>
);
};

export default Contacts;

