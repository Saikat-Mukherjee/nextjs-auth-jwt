import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


connect();

export async function POST(request:NextRequest) {
    const res = await request.json();
    console.log(res);
    try {
        let username = res.username;
        let password = res.password;
        let email = res.email;
        
        // Check if the user already exists 
        let user = await User.findOne({ username: username });

        if (user) { 
            console.log('User already exists:', user); 
            return NextResponse.json({ message: 'User already Exists' }, { status: 201 }); 
        }

        // Hash the password 
        const saltRounds = 10; 
        const hashedPassword = await bcryptjs.hash(password, saltRounds)
        let userDetails = {
            username : username,
            password : hashedPassword,
            email : email
        }

        // Create a new user if not found 
        user = new User(userDetails); 
        await user.save(); 
        console.log('New user created:', user); 
        return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
    }
}