"use client"

import { useState, useEffect, useRef, use } from "react"

import { useUser } from '@/lib/hooks';

import { useRouter } from "next/navigation";
import GrantView from "@/components/grantView";


const Dashbaord = () => {
    const user = useUser()
    const router = useRouter()

    useEffect(() => {
        if(!user){
            router.push('/login')
        }
    },[user])

    return (
        <div>
            <GrantView />
        </div>
    )
}

export default Dashbaord