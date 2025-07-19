import connect from '../../../../../DBconfig/dbconfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {email, password } = reqBody
        console.log(reqBody);

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ error: "User not registered" }, { status: 400 })
        }
        console.log('user exists')
        const validPassword = await bcryptjs.compare(password,user.password);
    
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
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
        const response = NextResponse.json({
            message: "Login successfully",
            success: true,
            tokenData
        })
        response.cookies.set('token', token, { httpOnly: true })
        return response
        

    } catch (error) {
        if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
    }
}