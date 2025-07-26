"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/Redux/store";
import { assignUsername } from "@/Redux/features/auth";
import { assignEmail } from "@/Redux/features/email";

export default function Login(){


    const username = useSelector((state: RootState) => state.username.value )
    const dispatch = useDispatch<AppDispatch>();
    const Router = useRouter();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

        const LoginHandler=async()=>{
        try {
            console.log('checkpoint 1');
        const response = await axios.post('/api/user/login',
            JSON.stringify({
                email:email,
                password:password,
            })
        );
        if(response.data.success){
            toast.success(response.data.message,{
            position:"top-center",
            closeButton:true
        })
        }else{
            toast.error(response.data.message) 
        }
        console.log(response.data);
        dispatch(assignUsername(response.data.tokenData.username));
        dispatch(assignEmail(response.data.tokenData.email))
        console.log(username);
        Router.push('/');                  
    } catch (error:unknown) {
          const errMsg = error instanceof Error ? error.message : String(error);
          toast.error(errMsg,{
            position:"top-center",
            closeButton:true
        });
          console.error(error);
        }
    }

    return(
        <div className="flex px-5">
            <div><Image src="/assets/sideImage.png" width={600} height={600} alt="nft"/></div>
            <div className="py-20 px-10 h-full w-[45vw] flex flex-col gap-4"> 
                <div className="text-7xl  text-white">Welcome Back</div>
                <div className="text-2xl  text-white">Welcome! enter your details and start creating, collecting and selling NFTs.</div>
                <div className="flex flex-col h-[30vh] justify-between">
                    <input type="email"    placeholder={` Email Address`} onChange={(e)=>{setEmail(e.target.value)}} className="border bg-white border-3 placeholder-black placeholder-font-bold border-black rounded-full w-[30vw] h-[9vh] rounded-full"/>
                    <input type="password" placeholder={` Password`} onChange={(e)=>{setPassword(e.target.value)}} className="border bg-white border-3 border-black rounded-full w-[30vw] placeholder-black placeholder-font-bold h-[9vh] rounded-full"/>
                    <button onClick={()=>{LoginHandler()}} className="cursor-pointer active:scale-80 border text-white bg-[#A259FF] border-3 border-black rounded-full w-[30vw] h-[9vh] rounded-full font-bold">Login</button>
                </div>
                <Link href={'/SignUp'} className="font-lg text-[#37D9E2]">Dont have account ? Create one</Link>
            </div>
        </div>
    );
}