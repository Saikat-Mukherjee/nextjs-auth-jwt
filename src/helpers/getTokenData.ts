import { NextRequest } from "next/server";
import  jwt  from "jsonwebtoken";

export const getTokenData = (request: NextRequest) => {

    try {
        const token = request.cookies.get('token')?.value || "";
        const decoded = jwt.verify(token, process.env.SECRET_KEY!);
        return decoded;
    } 
    catch (error:any) {
        throw new Error(error.message);
    }
}