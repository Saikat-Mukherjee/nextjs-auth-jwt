import { getTokenData } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig"

connect();

export async function GET(request:NextRequest){
    const token = request.cookies.get('token')
    try {
       const userId = await getTokenData(request); 
      let user = await User.findOne({__id: userId}).select("-password");
      return NextResponse.json({
        message:"User found",
        data:user
      })
      
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400});
    }
}

