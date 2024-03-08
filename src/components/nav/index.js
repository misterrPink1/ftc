'use client'
import React, { useState, useEffect } from 'react'

//import { CsvToHtmlTable } from 'react-csv-to-table';
import { useMyState } from "@/context/stateContext";
import { useUser  } from '@/lib/hooks';
import Link from 'next/link'

import { useRouter } from 'next/navigation';

import Login from '../login';


const Nav = () => {
    const user = useUser()
    const router = useRouter()
    const [triggerLogin, setTriggerLogin] = useState(false)

    const contextState = useMyState()
    const loggedIn = contextState?.loggedIn
    const setLoggedIn = contextState?.setLoggedIn

    const logoutHandler = async () => {
      let res = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      if(res.status === 200){
        console.log('logout successful')
        setLoggedIn(false)
        router.push('/')
      } else {
        console.error("Magic Logout Failed", await res.text())
        alert("There was an issue with logout, please message @misterrpink1 on twitter.")
      }
    }

    useEffect(() => {
      if(loggedIn){
        setTriggerLogin(false)
      }
    }, [loggedIn])

    return (
      <div className="flex w-full p-10 sm:p-6 z-40 place-items-center">
        <div className="w-4/12 font-black text-4xl"><Link href="/">FTC</Link></div>
        <div className="w-8/12 underline text-right text-sm pr-6 cursor-pointer hover:text-lychee-red" ><Link href="/more">More.</Link></div>
        {user 
          ? <div className='text-xs hover:text-lychee-red cursor-pointer' onClick={()=>logoutHandler()}>logout</div> 
          : <div className='text-xs hover:text-lychee-red cursor-pointer' onClick={()=>setTriggerLogin(true)}>login</div>}
        
        {
          triggerLogin &&
            <div className='fixed top-0 left-0 z-10 backdrop-blur-xl h-screen w-screen flex place-items-center place-content-center'>
              
              <div>
                <div onClick={()=>setTriggerLogin(false)} className='p-4 text-xs text-right'>close</div>
                <Login noName={true}/>
              </div>
            </div>
        }
      </div>
    )
  }


export default Nav;
