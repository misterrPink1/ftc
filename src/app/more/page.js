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
                <div className='grid grid-cols-2 lg:gap-4 text-center px-8 place-items-center lg:px-72 gap-5 text-xs'>
                    <Link href="https://buy.stripe.com/28oaGYb4GbT85AkcMW">
                            <div className="bg-white text-black border border-green-300 shadow-green-300  rounded-xl shadow-2xl p-10 flex flex-col place-items-center gap-2 cursor-pointer hover:bg-black hover:text-white hover:shadow-xl hover:shadow-lychee-red hover:border-0">
                                <div>Buy me a coffee ❤️ </div>
                            </div>
                    </Link>
                    <Link href={'https://www.lych3e.com/'}>
                        <div className='p-10 rounded-lg border hover:bg-black hover:text-white cursor-pointer'>
                            <div className='text-xl'>Lychee </div>
                            <div>The fastest spreadsheet to graph tool to exist on the planet. AKA The Excel Killer. Data analysis done with speed and simplicity. (Lifetime access available now)</div>
                        </div>
                    </Link>
                    <Link href={'https://difunk.com/'}>
                        <div className='p-10 rounded-lg border hover:bg-black hover:text-white cursor-pointer'>
                            <div className='text-xl'>DiFunk</div>
                            <div>Create amazing designs that you gotta pay designers a bucket load of money for. Powered by AI.</div>
                        </div>
                    </Link>
                    <Link href={'https://www.overtime.club/'}>
                        <div className='p-10 rounded-lg border hover:bg-black hover:text-white cursor-pointer'>
                            <div className='text-xl'>Overtime </div>
                            <div>The all-in-one platform for pro-athletes to learn from the best in the game. Feedback in the form of TikTok reaction videos and AI for instant help.</div>
                        </div>
                    </Link>
                    <Link href={'https://hcked.xyz/'}>
                        <div className='p-10 rounded-lg border hover:bg-black hover:text-white cursor-pointer'>
                            <div className='text-xl'>Hcked </div>
                            <div>The platform to learn the A-Zs about hacking. Not the evil hacking. Ethical hacking. If you’re a guy who knows nothing about hacking but want to become a cyber-overlord with speed, this is the place for you.</div>
                        </div>
                    </Link>
                    <Link href={'https://www.theyouuproject.com/'}>
                        <div className='p-10 rounded-lg border hover:bg-black hover:text-white cursor-pointer'>
                            <div className='text-xl'>TheYouuProject </div>
                            <div>Ever seen those videos of Dr. Huberman on Joe Rogan’s show talking about how to optimize your health in so many different ways to be the best version of yourself? Well, what if you had tools for every single method? Get ready to be mind blown with the power of AI.</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default More;