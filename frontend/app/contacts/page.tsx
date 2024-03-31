"use client"
import React, { useState, useEffect } from 'react';
//import { useRouter } from 'next/router';
import Link from 'next/link';

type Contact = {
  id: number;
  name: string;
icon : string;
link :  string
};

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact []>([]);
  const [selectedcontacts, setSelectedContacts] = useState<number[]>([]);

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


  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4"> Contacts:</h2>
      <div className="flex flex-wrap justify-center">
        {contacts.map((contact: Contact) => (
          <div key={contact.id} className="m-4">
            <img
              src={`http://127.0.0.1:3000/socials/${contact.icon}`}
              alt={contact.name}
              style={{ width: '100px', height: '100px' }}
              className="rounded-full"
            />
          </div>
        ))}
      </div>
      <div className="mt-8">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link href="/">NEXT</Link>
        </button>
      </div>
    </div>
  );
};

export default Contacts;

