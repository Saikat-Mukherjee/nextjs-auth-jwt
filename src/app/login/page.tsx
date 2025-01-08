"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { redirect } from 'next/navigation'

export default function LoginPage(){

    const router = useRouter();
    
    const [user,setuser] = React.useState({
        password:"",
        username:"",
    })

    const onLogin = async ()=>{
        console.log(user);

        try {
            const response = await axios.post('http://localhost:3000/api/users/login',user);
            console.log(response);
            console.log("Worked as expected");
            router.push('/profile');    
        } catch (error) {
            console.log("Did not work",error);
            return;
        }
        finally{
            console.log("Login Success");
           // redirect(`/profile`) // Navigate to the new post page
        }
    }

    
    return (
        <div className="absolute container flex justify-center">
            <div className="relative">
                <h4>Login</h4>
                <div className="w-100 mx-auto flex flex-col">
                    <label htmlFor="username">Username</label>
                    <input type="text" 
                        id="username" 
                        className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none text-black focus:border-gray-600"
                        name="username" 
                        placeholder="Enter your username"
                        value={user.username}
                        onChange={(e) => setuser({...user,username:e.target.value})}
                        ></input>
                        <label htmlFor="password">Password</label>
                        <input type="password" 
                        id="password" 
                        className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none text-black focus:border-gray-600"
                        name="password" 
                        placeholder="Enter your password"
                        value={user.password}
                        onChange={(e) => setuser({...user,password:e.target.value})}
                        ></input>
                        <button 
                          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                          onClick={onLogin}
                          >Log In
                          </button>
                        <p className="text-sm text-gray-500">Don't have an account? 
                            <Link href="/signup" className="text-blue-600 hover:text-blue-800">Sign up</Link>
                        </p>
                </div>
            </div>
        </div>
    )
}