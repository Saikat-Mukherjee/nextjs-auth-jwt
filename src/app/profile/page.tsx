"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ProfilePage(){

    const router = useRouter();

    const onLogout = async ()=> {
            
        try {
            const response = await axios.get('/api/users/logout');
            console.log(response);
            if (response.status === 200) {
                router.push('/login');
            }
        } catch (error) {
            console.log("Something went Wrong");
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Profile Page</h1>
                    <button
                    onClick={onLogout}
                    className="px-4 py-2 border rounded-full"
                    >Logout</button>
                </div>
            </div>
        </div>
    )
}