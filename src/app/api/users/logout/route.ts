import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function GET(request:NextRequest){

    try {
        const response = NextResponse.json({
            message: "logout successfully",
            success: true
        })

        response.cookies.set("token","",{httpOnly:true, expires:new Date(0)});

        return response;
        
    } catch (error) {
        
        console.error('Error login out user:', error);
        return NextResponse.json({ message: 'Error Logging out user' }, { status: 500 });
    }
}