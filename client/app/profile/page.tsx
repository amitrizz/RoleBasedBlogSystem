"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Cookies from 'js-cookie';
import Header from "../Header/page"
interface User {
    name: string;
    role: string;
    email: string;
    _id: string; // or number, depending on your backend
}

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);  
    const [isloading, setIsloading] = React.useState(false);
    const saveDraftBlog = async () => {
        try {
            setIsloading(true);
            const token = Cookies.get("token");
            const res = await axios.get(
                "http://localhost:5000/api/user/logged-user",
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add token to the Authorization header
                    },
                }
            );
            console.log(res.data.user);
            setUser(res.data.user)
            
        } catch (error) {
            console.error(error);
        } finally {
            setIsloading(false);
        }
    };

    useEffect(() => {

        saveDraftBlog(); // Call the async function
    }, []); // Depend on blog so it runs when b

    const logout = () => {
        // Remove the token
        Cookies.remove('token', { path: '/' });
        router.push("/login")
    }
    return (<>
        <Header />
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
                <h1 className="text-2xl font-semibold text-center text-gray-800">Profile</h1>
                <br />
                <h1 className="text-2xl font-semibold text-center text-gray-800">{user?.name}</h1>
                <br />
                <h1 className="text-2xl font-semibold text-center text-gray-800">{user?.email}</h1>
                <br />
                <h1 className="text-2xl font-semibold text-center text-gray-800">{user?.role}</h1>
                <br />
                <button
                    onClick={logout}
                    className="w-full py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                >
                    Logout
                </button>
            </div>
        </div>
    </>

    )
}