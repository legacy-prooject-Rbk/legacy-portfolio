"use client"

import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';

interface ProfileFormProps { }

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

interface FormDataValues {
    id: Number;
    fullName: string;
    email: string;
    profession: string;
    bio: string;
    city: string;
    photo: File | null;
    backgroundImage: File | null;
}

const ProfileForm: React.FC<ProfileFormProps> = () => {
    const [email, setEmail] = useState<string>("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
    const [profession, setProfession] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");

    const [image, setImage] = useState<string>('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0DBq-VKUCu8i_bhQJaUKNFlN3_vy7OgThpw&usqp=CAU');
    const [bgImage, setBgImage] = useState<string>();
    const [portfolio, setPortfolio] = useState<FormDataValues>()


    const router = useRouter();
    const token = localStorage.getItem('token')
    axios.interceptors.request.use(config => {

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    const createProfile = async () => {
        if (!(fullName && email && profession && bio && city && photo && backgroundImage)) {
            alert('Fill All Data')
            return;
        }
        try {
            const formValues: FormDataValues = {
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
                formData.append(key, formValues[key] as string | Blob);
            }

            const { data } = await axios.post(
                "http://localhost:3000/api/portfolio",
                formData
            );
            setPortfolio(data)
            router.push('/interests')

        } catch (error) {
            console.log(error);
        }
    };

    const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedImage = event.target.files && event.target.files[0];
        if (selectedImage) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(selectedImage);
        }
        setPhoto(selectedImage);
    };

    const handleBackgroundImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedImage = event.target.files && event.target.files[0];
        if (selectedImage) {
            const reader = new FileReader();
            reader.onload = () => {
                setBgImage(reader.result as string);
            };
            reader.readAsDataURL(selectedImage);
        }

        setBackgroundImage(selectedImage);
    };

    return (
        <div className="flex justify-center">
            <div className="py-4 px-5 bg-white rounded border-[1px] mt-2 border-[#E24724] shadow-md">
                <div className="grid grid-cols-2 z-1 divide-x-2">
                    <div className="max-w-md mx-auto my-10 p-6">
                        <div className="mb-4">
                            <div className="w-40 h-40 rounded-full shadow mx-auto overflow-hidden">
                                {image && <img className="w-[100%] h-[100%] object-cover" src={image} alt="" />}
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
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                        />

                        <input
                            className="w-full px-3 py-2 mb-4 text-gray-700 border rounded"
                            type="text"
                            placeholder="Profession"
                            value={profession}
                            onChange={(event) => setProfession(event.target.value)}
                        />
                    </div>
                    <div className="max-w-md mx-auto my-10 p-6">
                        <textarea
                            className="w-full h-24 px-3 py-2 mb-4 text-gray-700 border rounded"
                            placeholder="Bio"
                            value={bio}
                            onChange={(event) => setBio(event.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
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
                <div className="float-end">
                    <button
                        className="primary-button"
                        onClick={() => {
                            createProfile()
                            console.log(portfolio)
                        }}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>

    )
}

export default ProfileForm;
