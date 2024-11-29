"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Cookies from 'js-cookie';
import Header from "../Header/page"


export default function LoginPage() {
    const router = useRouter();
    const [blog, setBlog] = useState({
        title: "",
        content: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [isloading, setIsloading] = React.useState(false);

    const onLogin = async () => {
        try {
            setIsloading(true);
            const token = Cookies.get("token");
            const res = await axios.post("http://localhost:5000/api/blog/save-draft-blog", blog, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add token to the Authorization header
                },
            });

            if (res) {
                setBlog({...blog, title: "", content: ""});
                console.log(res);
                alert(res.data.message);
            }

        } catch (error) {
            console.log(error);

        } finally {
            setIsloading(false);
        }
    }

    useEffect(() => {
        if (blog.title.length > 0 && blog.content.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [blog])
    return (
        <>
            <Header />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
                    <h1 className="text-2xl font-semibold text-center text-gray-800">
                        {isloading ? "Processing" : "Post a Blog"}
                    </h1>

                    <div className="mt-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Content
                        </label>
                        <input
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500"
                            type="text"
                            name="content"
                            id="content"
                            value={blog.content}
                            onChange={(e) => setBlog({ ...blog, content: e.target.value })}
                            placeholder="Content"
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500"
                            type="text"
                            name="title"
                            id="title"
                            value={blog.title}
                            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                            placeholder="Title"
                        />
                    </div>

                    <button
                        disabled={buttonDisabled}
                        className={`w-full py-2 mt-6 text-white rounded-lg ${buttonDisabled
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        onClick={onLogin}
                    >
                        {buttonDisabled ? "No Data" : "Post Blog"}
                    </button>
                </div>
            </div>
        </>

    )
}