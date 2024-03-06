
"use client"

import { useEffect } from "react"

import { useUser } from '@/lib/hooks';

import Login from '@/components/login';
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const user = useUser()
    const router = useRouter()

    useEffect(() => {
        if(!user){
            router.push('/login')
        }else{
            router.push('/')
        }
    },[user])

    return (
        <div className='flex h-screen w-screen place-items-center place-content-center'>
            <div>
                <Login noName={true}/>
            </div>
        </div>
    );
};

export default LoginPage;


