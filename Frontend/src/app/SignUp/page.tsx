"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from 'react-hot-toast';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/Redux/store";
import { assignUsername } from "@/Redux/features/auth";

export default function SignUp(){

    const username = useSelector((state: RootState) => state.username.value )
    const dispatch = useDispatch<AppDispatch>();
    const Router = useRouter();
    const [Username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [password2,setPassword2]=useState('');

    const SignUpHandler=async()=>{
        if(password!=password2) return toast("Enter same password");
        try {
        const response = await axios.post('/api/user/signup',
            JSON.stringify({
                username:Username,
                email:email,
                password:password,
            })
        );
        console.log(response.data);
        dispatch(assignUsername(response.data.newUser.username as string));
        console.log(username);
        console.log(response.data.newUser);
        console.log(response.data.newUser.username);
        

        Router.push('/');                  
    } catch (error) {
            toast('error');
            console.log(error);
        }
    }

    return(
        <div className="flex px-5">
            <div><Image src="/assets/sideImage.png" width={600} height={600} alt="nft"/></div>
            <div className="py-20 px-10 h-full w-[45vw] flex flex-col gap-4"> 
                <div className="text-7xl  text-white">Create Account</div>
                <div className="text-2xl  text-white">Welcome! enter your details and start creating, collecting and selling NFTs.</div>
                <div className="flex flex-col h-[60vh] justify-between">
                    <input type="text"     placeholder={` username`} value={Username} onChange={(e)=>{setUsername(e.target.value)}} className="placeholder-black placeholder-font-bold border bg-white border-3 border-black rounded-full w-[30vw] h-[9vh] rounded-full"/>
                    <input type="email"    placeholder={` Email Address`} onChange={(e)=>{setEmail(e.target.value)}} className="border bg-white border-3 placeholder-black placeholder-font-bold border-black rounded-full w-[30vw] h-[9vh] rounded-full"/>
                    <input type="password" placeholder={` Password`} onChange={(e)=>{setPassword(e.target.value)}} className="border bg-white border-3 border-black rounded-full w-[30vw] placeholder-black placeholder-font-bold h-[9vh] rounded-full"/>
                    <input type="password" placeholder={` Confirm Password`} onChange={(e)=>{setPassword2(e.target.value)}} className="border bg-white border-3 border-black rounded-full w-[30vw] h-[9vh] rounded-full placeholder-black placeholder-font-bold"/>
                    <button onClick={()=>{SignUpHandler()}} className="cursor-pointer border text-white bg-[#A259FF] border-3 border-black rounded-full w-[30vw] h-[9vh] rounded-full font-bold">Create Account</button>
                </div>
                <Link href={'/Login'} className="font-lg text-[#37D9E2]">Already have a account ?</Link>
            </div>
        </div>
    );
}