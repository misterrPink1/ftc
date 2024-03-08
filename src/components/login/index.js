'use client'

import React, { useState } from 'react';

import { useMyState } from "@/context/stateContext";
import { Magic } from 'magic-sdk';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Login = ({noName}) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const contextState = useMyState()
    const loggedIn = contextState?.loggedIn
    const setLoggedIn = contextState?.setLoggedIn


    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY)
            const didToken = await magic.auth.loginWithMagicLink({ email: email })

            const body = {
                email: email,
                name: name && name,
            }
            let res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + didToken,
                },
                body: JSON.stringify( body ),
            })
            if(res.status === 200){
                setLoggedIn(true)
            } else {
                console.error("Magic Login Failed", await res.text())
                alert("There was an issue with login and sub, please message @misterrpink1 on twitter.")
            }
    };

    return (
        <div className='bg-white font-body shadow-2xl rounded-xl text-black p-4 '>
            <form onSubmit={handleSubmit} className='flex flex-col place-items-center'>
                {
                    loading 
                        ?
                        <div><AiOutlineLoading3Quarters className='animate-spin'/>
                            Loading...
                        </div>
                        : <>
                            {
                                !(noName) && 
                                <div className='py-2 text-xs'>
                                    Name
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
            
                                        className='rounded border px-2 mx-2 py-2 text-black text-xs w-48'
                                        />
                                </div>
                            }
                            
                            <div className='py-2 text-xs'>
                                Email
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='rounded border px-2 mx-2 py-2 text-black text-xs w-48'
                                />
                            </div>
                            <button type="submit" className='bg-lychee-black px-6 rounded-md py-2 text-xs text-white mt-4'>Submit</button>
                        </>
                }

                
            </form>
        </div>
    );
};

export default Login;