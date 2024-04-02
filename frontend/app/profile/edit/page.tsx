"use client"
import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/navigation";

const tunisiaStates = [
    "Ariana",
    "Beja",
    "Ben Arous",
    "Bizerte",
    "Gabes",
    "Gafsa",
    "Jendouba",
    "Kairouan",
    "Kasserine",
    "Kebili",
    "Kef",
    "Mahdia",
    "Manouba",
    "Medenine",
    "Monastir",
    "Nabeul",
    "Sfax",
    "Sidi Bouzid",
    "Siliana",
    "Sousse",
    "Tataouine",
    "Tozeur",
    "Tunis",
    "Zaghouan"
];

interface PortfolioItem {
    id: number;
    fullName: string;
    email: string;
    profession: string;
    bio: string;
    city: string;
    photo: File | null;
    backgroundImage: File | null;
    Interests: any[];
    Contacts: any[];
}

const Edit: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
    const [profession, setProfession] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [portfolioId, setPortfolioId] = useState(0)
    const [card, setCard] = useState<PortfolioItem | null>(null);

    const router = useRouter();
    const token = localStorage.getItem('token')
    const id = localStorage.getItem("userId");
    axios.interceptors.request.use(config => {

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    useEffect(() => {
        fetchOne();
    }, []);

    useEffect(() => {
        if (card) {
            setPortfolioId(card.id)
            setEmail(card.email);
            setProfession(card.profession);
            setBio(card.bio);
            setCity(card.city);
            setFullName(card.fullName);
            setPhoto(card.photo);
            setBackgroundImage(card.backgroundImage);
        }
    }, [card]);

    const fetchOne = () => {
        if (id) {
            axios
                .get<PortfolioItem>(`http://localhost:3000/api/portfolio/user/${id}`)
                .then((response) => {
                    setCard(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const updated = (
        fullName: string,
        email: string,
        profession: string,
        bio: string,
        city: string,
        photo: File | null,
        backgroundImage: File | null
    ) => {
        const formValues = {
            fullName,
            email,
            profession,
            bio,
            city,
            photo,
            backgroundImage,
        };
        const formData = new FormData();
        for (const key in formValues) {
            if (formValues[key] !== null) {
                formData.append(key, formValues[key]);
            }
        }
        if (id) {
            axios
                .put(`http://localhost:3000/api/portfolio/${portfolioId}`, formData)
                .then(() => { router.push('/profile') })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedImage = event.target.files[0];
            setPhoto(selectedImage);
        }
    };

    const handleBackgroundImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedImage = event.target.files[0];
            setBackgroundImage(selectedImage);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex justify-center ">
                <div className="py-4 px-5 bg-white rounded border-2 shadow-md mt-10 border-[1px] border-[#909090]">
                    <div className="grid grid-cols-2 z-1 divide-x-2">
                        <div className="max-w-md mx-auto my-10 p-6">
                            <div className="mb-4">
                                <div className="w-40 h-40 rounded-full shadow mx-auto overflow-hidden">
                                    {card && (
                                        <img
                                            className="w-[100%] h-[100%] object-cover"
                                            src={card.photo as any} // Provide a fallback image
                                            alt=""
                                        />
                                    )}
                                </div>
                                <input
                                    className="form-control mt-3 mx-5 w-[70%]"
                                    onChange={handlePhotoChange}
                                    type="file"
                                    accept="image/*"
                                />
                            </div>

                            <input
                                className="w-full px-3 py-2 mb-4 text-gray-700 border rounded"
                                type="text"
                                value={fullName}
                                placeholder="Full Name"
                                onChange={(event) => {
                                    setFullName(event.target.value);
                                }}
                            />

                            <input
                                className="w-full px-3 py-2 mb-4 text-gray-700 border rounded"
                                type="text"
                                placeholder="Profession"
                                value={profession}
                                onChange={(event) => {
                                    setProfession(event.target.value);
                                }}
                            />
                        </div>
                        <div className="max-w-md mx-auto my-10 p-6">
                            <textarea
                                className="w-full h-24 px-3 py-2 mb-4 text-gray-700 border rounded"
                                placeholder="Bio"
                                value={bio}
                                onChange={(event) => {
                                    setBio(event.target.value);
                                }}
                            />

                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                                className="w-full px-3 py-2 mb-4 text-gray-700 border rounded"
                            />
                            <select
                                onChange={(event) => setCity(event.target.value)}
                                className="w-full px-3 py-2 mb-4 text-gray-700 border rounded"
                                value={city}
                            >
                                <option value={''}>City...</option>
                                {tunisiaStates.map(city => <option value={city} key={city}>{city}</option>)}
                            </select>

                            <div className="flex justify-between">
                                <label htmlFor="">Background Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleBackgroundImageChange}
                                    className="px-3 py-2 mb-4 mr-2 text-gray-700 border rounded form-control"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="float-end"></div>
                    <button
                        className="btn btn-success"
                        onClick={() => {
                            updated(
                                fullName,
                                email,
                                profession,
                                bio,
                                city,
                                photo,
                                backgroundImage
                            );
                        }}
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Edit