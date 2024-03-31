"use client"

import axios from "axios";
import { useEffect, useState } from "react";


function Profile() {
    const [portfolio, setPortfolio] = useState(null)
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        fetchPortfolio();
    }, [])

    const fetchPortfolio = async () => {
        try {
            const { data } = await axios('http://127.0.0.1:3000/api/portfolio/user/' + userId)
            setPortfolio(data)
        } catch (error) {
            alert('Error fetching Portfolio ❌')
            console.log('Error fetching Portfolio ❌\n', error);
        }
    }

  return (
    <div>page</div>
  )
}

export default Profile