"use client"

import axios from "axios";
import { useEffect, useState } from "react";


function Profile() {
    const [portfolio, setPortfolio] = useState([])
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        fetchPortfolio();
    }, [])

    const fetchPortfolio = async () => {
        try {
            const  {data}  = await axios('http://127.0.0.1:3000/api/portfolio/user/' + userId)
            setPortfolio(data)
            console.log(data)
        } catch (error) {
            console.log(portfolio)
            alert('Error fetching Portfolio ❌')
            console.log('Error fetching Portfolio ❌\n', error);
        }
    }

  return (
    <div>{portfolio.email}</div>
  )
}

export default Profile