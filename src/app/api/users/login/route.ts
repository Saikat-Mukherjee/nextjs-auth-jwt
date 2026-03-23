import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


connect();

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
        }

        const match = await bcryptjs.compare(password, user.password);
        if (!match) {
            return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
        }

        const tokenData = {
            username: user.username,
            email: user.email,
            id: user._id,
        };
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({ message: "Login successful", success: true });
        response.cookies.set("token", token, { httpOnly: true });
        return response;

    } catch (error) {
        console.error('Error logging in user:', error);
        return NextResponse.json({ message: 'Error logging in user' }, { status: 500 });
    }
}