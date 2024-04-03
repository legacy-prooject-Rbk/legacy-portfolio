'use client'
import { useEffect, useState } from "react";

// import axios from "axios";
// import Link from "next/link";

import { useRouter } from "next/navigation"; // Importing useRouter for client-side navigation


const Navbar = () => {
    
    const [portfolio, setPortfolio] = useState<any>(null);
   
      
    const router = useRouter() // Using useRouter hook for client-side navigation
    const userId = localStorage.getItem('userId');

    // useEffect(() => {
    //     if (userId) {
    //         fetchPortfolio();
    //     }
    // }, []);

    // const fetchPortfolio = async () => {
    //     try {
    //         const { data } = await axios.get(`/api/portfolio/user/${userId}`);
    //         setPortfolio(data);
    //     } catch (error) {
    //         console.error('Error fetching Portfolio ❌\n', error);
    //         alert('Error fetching Portfolio ❌');
    //     }
    // };

    const navItems = [
        { id: 0, title: '🏠 Home', path: "/" },
        { id: 1, title: '👱🏻‍♂️ Login', path: "/login" },
        { id: 2, title: '👱🏻‍♂️ Register', path: "/signup" }, 
    ];

    const authNavItems = [
        { id: 3, title: '🏠 Home', path: "/" }, 
        { id: 4, title: '👱🏻‍♂️ Profile', path: `/profile/${userId}` }, 
        { id: 5, title: ' 🖊️ Edit Profile', path: `/profile/${userId}/edit`}, 
        { id: 6, title: ' 🌐 Contacts/Interests', path: "/interests" }, 
       
    ];

    const handleLogout = () => {
        localStorage.clear()
        router.push('/login');
    };

   
    return (

        <nav className="nav-bar bg-amber-600 h-20">
            <div className="nav-logo" onClick={() => router.push('/')}>
             .  
            </div>
            <div className=" mr-auto ml-[200px] space-x-12 flex items-center  ">
                {userId ? (
                    authNavItems.map(item => (
                       <div key={item.id} // Ensure each key is unique
                        className={`${router.pathname == item.path ? 'nav-item-active' : 'nav-item'} hover:bg-white cursor-pointer rounded-full px-3 py-1 text-sm font-semibold text-lg  `}
                            onClick={() => router.push(item.path)}
                    
                        >
                            {item.title}
                        </div>
                    ))
                ) : (
                    navItems.map(item => (
                        <div key={item.id} // Ensure each key is unique
                            className="nav-item"
                            onClick={() => router.push(item.path)}
                        >
                            {item.title}
                            <div> <h1 onClick={handleLogout}>Logout </h1> </div>
                        </div>
                        
                    ))
                )}
            </div>
            

            {portfolio && (
                <div
                    style={{ backgroundImage: `url(${portfolio.photo})`, backgroundSize: 'cover' }}
                    className="nav-bubble mr-11"
                >
                    <div className="nav-drop" >
                        <div
                            onClick={() => router.push('/edit')}
                            className="drop-item">👤 Edit Profile</div>
                        <div
                            onClick={handleLogout}
                            className="drop-item">↪ Logout</div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
