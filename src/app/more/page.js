import React from 'react';
import Link from 'next/link'

import { FaXTwitter, FaInstagram, FaTiktok  } from "react-icons/fa6";
import Nav from '@/components/nav';


const More = () => {
    return (
        <div className='bg-lychee-black text-white'>
            <div className='flex flex-col place-items-center place-content-center h-screen'>
                <div className='text-4xl font-black'>More by <span>@misterrpink</span></div>
                <div className='flex text-4xl py-6 gap-4'>
                    <div className='hover:text-lychee-red'><Link href={"https://twitter.com/misterrpink1"}><FaXTwitter /></Link></div>
                    <div className='hover:text-lychee-red'><Link href={"https://www.instagram.com/misterrpink1_builds/"}><FaInstagram /></Link></div>
                    <div className='hover:text-lychee-red'><Link href={"https://www.tiktok.com/@misterrpink_builds"}><FaTiktok /></Link></div>
                </div>
                <div className='grid grid-cols-2 gap-4 text-center'>
                    <Link href={'https://www.lych3e.com/'}>
                        <div className='p-10 rounded-lg border hover:bg-black hover:text-white cursor-pointer'>
                            Lychee
                        </div>
                    </Link>
                    <Link href={'https://difunk.com/'}>
                        <div className='p-10 rounded-lg border hover:bg-black hover:text-white cursor-pointer'>
                            DiFunk_
                        </div>
                    </Link>
                    <Link href={'https://www.overtime.club/'}>
                        <div className='p-10 rounded-lg border hover:bg-black hover:text-white cursor-pointer'>
                            Overtime
                        </div>
                    </Link>
                    <Link href={'https://hcked.xyz/'}>
                        <div className='p-10 rounded-lg border hover:bg-black hover:text-white cursor-pointer'>
                            Hcked
                        </div>
                    </Link>
                    <Link href={'https://www.theyouuproject.com/'}>
                        <div className='p-10 rounded-lg border hover:bg-black hover:text-white cursor-pointer'>
                            0_o
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default More;