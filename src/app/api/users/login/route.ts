import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


connect();

export async function POST(request:NextRequest) {
    const res = await request.json();
    try {
        let username = res.username;
        let password = res.password;
       // let email = res.email;
        
        // Check if the user already exists 
        let user = await User.findOne({ username: username });

        if (user) { 
            console.log('User already exists:', user);
            // Hash the password 
            const saltRounds = 10; 
            //const hashedPassword = await bcryptjs.hash(password, saltRounds);
            //if(user.password == hashedPassword){
            // Compare the hashed password with the provided password 
            const match = await bcryptjs.compare(password, user.password);
            if(match){
                console.log("User is Present");
                //create token Data
                const tokenData = {
                    username: user.username,
                    email: user.email,
                    id: user._id
                }
                // Generate a JWT token
                const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn:"1d"});

                const response = NextResponse.json({
                    message: "Login successfully",
                    success: true
                })

                response.cookies.set("token",token,{
                    httpOnly:true
                })

                return response;
            }
            else{
                console.log("Incorrect Credentials , Wrong Username/Password");
                return NextResponse.json({ message: 'Incorrect Credentials' }, { status: 400 });        
            } 
        }

        //return NextResponse.json({message: `User ${username} has successfully logged in`},{ status:200});
    } catch (error) {
        console.error('Error login in user:', error);
        return NextResponse.json({ message: 'Error Logging in user' }, { status: 500 });
    }
}