'use client'
//import React, { useState, useEffect } from 'react'

//import { CsvToHtmlTable } from 'react-csv-to-table';
import { useUser  } from '@/lib/hooks';
import Link from 'next/link'


const Nav = () => {
    const user = useUser()

    return (
      <div className="flex w-full p-10 sm:p-6 z-40">
        <div className="w-4/12 font-black text-xl"><Link href="/">Free The Creator</Link></div>
        <div className="w-8/12 underline text-right text-sm pr-6 cursor-pointer hover:text-lychee-red" ><Link href="/more">More.</Link></div>
      </div>      
    )
  }


export default Nav;
