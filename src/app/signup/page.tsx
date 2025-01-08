"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { redirect } from 'next/navigation'

export default function SignupPage (){
    const router = useRouter();
    const [user,setuser] = React.useState({
        email:"",
        password:"",
        username:"",
    })

    const onSignup = async ()=>{
        console.log(user);
       
        try {
            const response = await axios.post('http://localhost:3000/api/users/signup',user);
            console.log(response);
            console.log("Worked as expected");
            router.push("/login");
            
        } catch (error) {
            console.log("Did not work");
        }
        finally{
            console.log("Signup Success");
            //redirect(`/login`) // Navigate to the new post page
        }
    }

    return (
        <div className="container">
            <div className="flex  justify-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Signup</div>
                        <div className="card-body flex flex-wrap flex-col">
                            <label htmlFor="username">username</label>
                            <input id="username" className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                            type="text"
                            value={user.username}
                            onChange={(e) => setuser({...user,username:e.target.value})}
                            placeholder="username" 
                            />
                            <label htmlFor="email">email</label>
                            <input id="email" className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                            type="text"
                            value={user.email}
                            onChange={(e) => setuser({...user,email:e.target.value})}
                            placeholder="email" 
                            />
                            <label htmlFor="password">password</label>
                            <input id="password" className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                            type="password"
                            value={user.password}
                            onChange={(e) => setuser({...user,password:e.target.value})}
                            placeholder="password" 
                            />
                            <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                            onClick={onSignup}
                            >Signup here</button>
                            <Link className="text-center" href={"/login"}>Visit Login Page</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}