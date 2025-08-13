import connect from '../../../../../DBconfig/dbconfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { createHmac } from "crypto";
import { cookies } from "next/headers";



connect()

export async function POST(request: NextRequest) {
    const secret = process.env.SESSION_SECRET as string;
    try {
        const reqBody = await request.json()
        const {email, password } = reqBody
        console.log(reqBody);

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({
                error: "User not regsitered",
                success: false,
                status: 400
            })
        }
        console.log('user exists')
        const validPassword = await bcryptjs.compare(password,user.password);
    
        if (!validPassword) {
            return NextResponse.json({ 
                error: "Mismatched Password",
                success: false,
                status: 404
             })
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        console.log(tokenData);
        console.log(process.env.JWT_SECRET as string)
        const token = jwt.sign(tokenData,process.env.JWT_SECRET!,{ expiresIn: '1d' });
        console.log(token);
        
        const sessionPayload = {username:user.username,isLoggedin:true};
        const sessionString = JSON.stringify(sessionPayload);   
        const signature = createHmac('sha256',secret)
        .update(sessionString).digest('hex');   
        const cookieValue = `${sessionString}.${signature}`;    
        (await cookies()).set('auth', cookieValue, {
        httpOnly: true, // Prevents client-side JS from accessing the cookie
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/', // Cookie is available on all pages
        });

        const response = NextResponse.json({
            message: "Login successfully",
            success: true,
            tokenData
        })
        return response
        

    } catch (error) {
        if (error instanceof Error) {
    return NextResponse.json({ error: error.message,  status: 500, success:false });
  }
  return NextResponse.json({ error: 'Unknown error',  status: 500, success:false });
    }
}