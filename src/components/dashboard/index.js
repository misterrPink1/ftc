"use client"

import { useState, useEffect, useRef, use } from "react"

import { useMyState } from "@/context/stateContext";
import { useUser } from '@/lib/hooks';

import GrantView from "@/components/grantView";


const Dashbaord = () => {
    const user = useUser()

    const contextState = useMyState()
    const loggedIn = contextState?.loggedIn
    const setLoggedIn = contextState?.setLoggedIn

    useEffect(() => {
        if(!user){
            setLoggedIn(false)
        }else{
            setLoggedIn(true)
        }
    },[user])

    return (
        <div>
            {!loggedIn && 
              <div className="px-4">
                <div className='text-5xl font-black text-center'> The Funding Method That No One Talks About</div>
                <div className="py-2 text-2xl text-center">The No-Equity $750 Million Grant List
                </div>
              </div>
              
            }

            <GrantView loggedIn={loggedIn}/>
            
        </div>
    )
}

export default Dashbaord