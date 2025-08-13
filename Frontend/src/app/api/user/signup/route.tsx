import connect from '../../../../../DBconfig/dbconfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { createHmac } from "crypto";
import { cookies } from "next/headers";

const secret = process.env.SESSION_SECRET as string;

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody

        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ error: "User already exists" ,status: 400, success:false })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        console.log("response from server",newUser);
        // send verification email
        await newUser.save();
        
       
                const sessionPayload = {username,isLoggedin:true};
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


        return NextResponse.json({
            message: "User created succesfully",
            success: true,
            newUser,
        })

    } catch (error) {
if (error instanceof Error) {
    return NextResponse.json({ error: error.message ,status: 400, success:false} );
  }
  return NextResponse.json({ error: 'Unknown error' ,status: 400, success:false} );
    }
}