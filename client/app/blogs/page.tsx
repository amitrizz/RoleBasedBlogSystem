"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Cookies from 'js-cookie';
import Header from "../Header/page"

interface Blog {
    title: string;
    content: string;
    _id: string; // or number, depending on your backend
}




export default function LoginPage() {
    const router = useRouter();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isloading, setIsloading] = React.useState(false);
    const saveDraftBlog = async () => {
        try {
            setIsloading(true);
            const token = Cookies.get("token");
            const res = await axios.get(
                "http://localhost:5000/api/blog/bloglist",
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add token to the Authorization header
                    },
                }
            );
            setBlogs(res.data.result);
        } catch (error) {
            console.error(error);
        } finally {
            setIsloading(false);
        }
    };

    useEffect(() => {

        saveDraftBlog(); // Call the async function
    }, []); // Depend on blog so it runs when b


    return (
        <>
            <Header />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="max-w-4xl mx-auto mt-10 p-4">
                    {isloading ? (
                        <p className="text-center text-xl font-semibold">Loading...</p>
                    ) : (
                        <p className="text-center text-xl font-semibold mb-6">Published Blogs</p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((blog) => (
                            <div
                                key={blog.title}
                                className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
                            >
                                <h3 className="text-xl font-bold text-gray-800 mb-4">{blog.title}</h3>
                                <p className="text-gray-600 mb-4">{blog.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>

    )
}