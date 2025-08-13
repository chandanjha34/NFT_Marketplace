import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createHmac } from "crypto";

export async function GET(){

    const secret = process.env.SESSION_SECRET as string;

    try {
        const sessionCookies = (await cookies()).get('auth');
        console.log(sessionCookies);
        if(!sessionCookies) return NextResponse.json({isLoggedIn: false });

        const [sessionString, originalSignature] = sessionCookies.value.split('.');

        const expectedSignature = createHmac('sha256', secret)
      .update(sessionString).digest('hex');

      if (expectedSignature !== originalSignature) {
      return NextResponse.json({ isLoggedin: false, error: 'Invalid session' }, { status: 401 });
    }

        const sessionData = JSON.parse(sessionString);
    
        return NextResponse.json({
                isLoggedin: sessionData.isLoggedin,
                username: sessionData.username,
            })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ isLoggedin: false, error: 'Server Error' }, { status: 500 });
    }
}