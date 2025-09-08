import { NextRequest, NextResponse } from 'next/server'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export async function GET(request: NextRequest){
    try {
        const Response = NextResponse.json({
            message: "logout successfully",
            success: true
        })

        Response.cookies.set("token", "",{
            httpOnly: true,
            expires: new Date(0)
        })

        return Response
        
    } catch (error:any) {
        return NextResponse.json({error: error.message},
            {status: 500}
        )
    }
}