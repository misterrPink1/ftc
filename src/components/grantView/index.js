"use client"

import { useState, useEffect, useMemo } from "react"
import Link from 'next/link'

import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

import { IoArrowUp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import Login from '@/components/login';

const GrantView = ({loggedIn}) => {

    const [colDefs] = useState([
        { field: "Name" },
        { field: "link", editable: true },
        { field: "Category" },
        { field: "Min $ Award" },
        { field: "Max $ Award" },
        { field: "Requirements" },
        { field: "Industry" },
        { field: "Description" },
        { field: "Location" },
        { field: "For whom?" },
        { field: "Deadline" },
        { field: "Additional Info" },
        { field: "Submission" },
      ]);
    const [data, setData] = useState()
    const [tempData] = useState([
        {
            "Name": "eBay Up and Running Grant",
            "link": "https://helloalice.com/grants/ebay/",
            "Submission": "https://helloalice.com/grants/ebay/",
            "Min $ Award": "$500",
            "Max $ Award": "$10,000",
            "Category": "grant",
            "Requirements": "18+, US resident",
            "Description": "The eBay Up & Running Grants program will award 50 eBay business sellers with grant packages of $10,000, including cash, eBay education and coaching, and more. This year, eBay is expanding its grant with an additional stipend worth up to $500 for each grantee to apply to eBay Refurbished office equipment, technology and tools to keep their small businesses up and running.",
            "Location": "USA"
          },
        {
            "Name": "X-Prize Wild Fire",
            "link": "https://pop.xprize.org/prizes/wildfire/overview",
            "Submission": "https://pop.xprize.org/prizes",
            "Min $ Award": "$1,000,000",
            "Max $ Award": "$3,500,000",
            "Category": "Challenge, competition",
            "Industry": "AI, Wild Fires",
            "Description": "The $11M XPRIZE Wildfire is a 4-year competition to innovate firefighting technologies that will end destructive wildfires.",
            "Location": "Global"
          },
          {
            "Name": "UNICEF Innovation Fund",
            "link": "https://www.unicefinnovationfund.org/apply/frontier-tech-solutions",
            "Submission": "https://form.jotform.com/230251713767354",
            "Min $ Award": "$100,000",
            "Max $ Award": "$100,000",
            "Category": "funding, grant",
            "Requirements": "impact lives of vulnerable children and youth, product should be registered in one of UNICEF's program countries",
            "Industry": "AR, Data Science, Drones, Frontier technology, VR, blockchain, web3",
            "Description": "The UNICEF Innovation Fund provides early-stage funding (equity-free) to for-profit start-ups developing frontier technology solutions that benefit vulnerable children and youth. They also offer tailored support for product development, business growth, mentorship, and access to the UNICEF network and resources.",
            "For whom?": "For-profit start-ups developing frontier technology solutions that benefit vulnerable children and youth.",
            "Deadline": "July 28, 2023."
          },
          {
            "Name": "Thiel Fellowship",
            "link": "https://thielfellowship.org/",
            "Submission": "https://thethielfellowship.my.site.com/login",
            "Min $ Award": "$100,000",
            "Max $ Award": "$100,000",
            "Category": "fellowship",
            "Requirements": "Young people with innovative ideas and a desire to create new things",
            "Description": "The Thiel Fellowship is a two-year program that gives young people $100,000 to build new ideas and projects. Instead of following a traditional educational path, Thiel Fellows focus on their innovative projects with the support of the Thiel Foundation's network.",
            "For whom?": "Young entrepreneurs and innovators who want to build new things and are willing to forego traditional educational pathways."
          },
          {
            "Name": "Microsoft for Startups",
            "link": "https://www.microsoft.com/en-us/startups?rtc=1",
            "Submission": "https://foundershub.startups.microsoft.com/signup",
            "Min $ Award": "$1,000 in Azure Credits",
            "Max $ Award": "$150,000 in Azure Credits",
            "Category": "Tech Platform and Support, freebies",
            "Description": "Microsoft for Startups Founders Hub brings people, knowledge, and technology together to help founders at every stage solve startup challenges. Sign up in minutes with no funding required.",
            "Location": "Global"
          },
          {
            "Name": "776 Fellowship",
            "link": "https://www.776.org/",
            "Submission": "https://www.776.org/",
            "Min $ Award": "$100,000",
            "Max $ Award": "$100,000",
            "Category": "fellowship, grant",
            "Requirements": "focus on climate change, impact startup",
            "Industry": "climate + energy, impact, sustainability",
            "Description": "The 776 Fellowship Program is a two-year program for young people who want to build a better future.\n776 Fellows receive a $100,000 grant and support from the Seven Seven Six network.",
            "Location": "Global",
            "For whom?": "18-23 year old",
            "Deadline": "@March 27, 2024"
          },
          {
            "Name": "MIT Solve Horizon Prize",
            "link": "https://solve.mit.edu/challenges/the-horizon-prize-2023",
            "Submission": "https://solve.mit.edu/challenges/the-horizon-prize-2023",
            "Max $ Award": "$150,000",
            "Category": "Challenge, Prize Money, competition",
            "Industry": "HealthCare-Specific Tech, data management and datasharing, environmental work, impact, packaging, tech",
            "Description": "The 2023 Horizon Prize, backed by MIT Solve, aims to enhance rare disease R&D and reduce environmental costs by finding solutions to cut carbon footprints and improve patient care. The prize seeks innovative technologies that streamline patient diagnostics, increase clinical trials' efficiency, reduce unnecessary waste, and optimize supply transportation. Incentives are increasing due to stricter emissions reporting regulations, promising new market opportunities for solutions.",
            "Location": "Global",
            "Deadline": "@June 23, 2023"
          }
        ])
    const [loading, setLoading] = useState(true)
    const [loggingIn, setLoggingIn] = useState(false)

    //Apply settings across all columns
    const defaultColDef = useMemo(() => ({
        filter: true, // Enable filtering on all columns
        resizable: true,
    }))
    
    //pull data once user is logged in
    useEffect(()=>{
        if(loggedIn && !data){
            fetch('api/grants') // Fetch data from server
            .then(result => result.json()) // Convert to JSON
            .then(rowData => setData(rowData.data)); // Update state of `rowData`
        } else if(!loggedIn && data){
            //clean up when user logs out
            setData(null)
        }
    }, [loggedIn, data])

    useEffect(()=>{
        if(!data){
            setLoading(true)
        }else{
            setLoading(false)
        }
    }, [data])


    return(
        <div className="p-10 w-screen">
            {
                loggedIn ?
                    <>
                    <div className="text-xs flex flex-col gap-1">
                        <div className="pb-2">Hi I am <Link href="https://twitter.com/misterrpink1" className="underline">@misterrpink</Link>,</div>
                        <div>I have tried to keep this list as simple as possible</div>
                        <div>🤏 You can click on each column to sort by the given column values</div>
                        <div>📐 All columns are resizable</div>
                        <div className="pt-2">😃 If Location, "For Whom", Deadline are empty, it means there are none specified, location agnostic, rolling deadline and for everyone </div>
                        <div>🔗 Double click on Link to copy it</div>
                        <div>
                            When you hover over a column header you can click on the hamburger icon to more granular filters. 
                            <div className="p-1 bg-slate-100 border border-slate-200 rounded-sm w-28 flex place-items-center place-content-center text-sm gap-1 mt-4">
                                Name <IoArrowUp /> <RxHamburgerMenu />
                            </div>
                        </div>
                        <div className="pt-4 sm:w-2/3">
                            Note:
                            <div>I am working on improvements for "Award amounts". Each grant is so variable. You will simply have to look at the website link itself to get a "true" value</div>
                        </div>
                    </div>
                    {
                        loading &&
                            <div className="flex w-full place-items-center place-content-center text-xs gap-2 py-10 text-lychee-red animate-pulse">
                                <AiOutlineLoading3Quarters className='animate-spin'/>
                                Loading...
                            </div>
                        
                    }
                    {
                        data &&
                            <div className="ag-theme-quartz py-20 w-[95%] h-[800px] mx-auto">
                                <AgGridReact 
                                    defaultColDef={defaultColDef} 
                                    rowData={data} 
                                    columnDefs={colDefs} 
                                    pagination={true}
                                    onCellValueChanged={event => console.log(`New Cell Value: ${event.value}`)}
                                    />
                            </div>                        
                    }
                    </>
                :
                <>
                {
                    !tempData &&
                        <div className="flex w-full place-items-center place-content-center text-xs gap-2 py-10 text-lychee-red animate-pulse">
                            <AiOutlineLoading3Quarters className='animate-spin'/>
                            Loading...
                        </div>
                    
                }
                {
                    tempData &&
                        <div className="ag-theme-quartz py-10 w-[95%] h-[500px] mx-auto">
                            <AgGridReact 
                                defaultColDef={defaultColDef} 
                                rowData={tempData} 
                                columnDefs={colDefs} 
                                pagination={true}
                                onCellValueChanged={event => console.log(`New Cell Value: ${event.value}`)}
                                />
                        </div>                        
                }
                {!loggedIn && 
                <div className="px-4 py-4">
                    <div className='text-sm font-black text-center'> The Hottest New Tool To Get Funding Without Giving Up Your Equity.</div>
                    <div className="py-2 text-xs text-center"> Just fill in the two boxes below and get instant access to:-
                    </div>
                    <div className="py-2 text-xs text-center"> * A $750M Grant List You Can Filter Through With Ease
                    </div>
                    <div className="py-2 text-xs text-center"> * Early Access To AI Tools To Apply For Grants Faster
                    </div>
                    <div className="py-2 text-xs text-center"> * VIP Discounts On Premium Tools For Your Startup
                    </div>
                </div>
                }
                {
                    <div className="grid grid-cols-2 text-xs place-content-center place-items-center px-20 gap-6">
                        <Link href="https://buy.stripe.com/28oaGYb4GbT85AkcMW">
                            <div className="bg-white  border border-green-300 shadow-green-300  rounded-xl shadow-2xl p-10 flex flex-col place-items-center gap-2 cursor-pointer hover:bg-black hover:text-white hover:shadow-xl hover:shadow-lychee-red hover:border-0">
                                <div>Buy me a $1 coffee + instant access ❤️ </div>
                                GO!
                            </div>
                        </Link>

                        <div>                        
                            {loggingIn ?
                                    <Login/>
                                
                                :
                                <div className="bg-white rounded-xl shadow-2xl p-10 flex flex-col place-items-center gap-2 hover:bg-black hover:text-white hover:shadow-lg cursor-pointer" onClick={()=>setLoggingIn(true)}>
                                    <div>Or don't buy me a coffee, get the list for free</div>
                                    <div> GO! </div>
                                </div>
                            }
                        </div>
                    </div>
                }
                </>
            }
            
        </div>
    )
}

export default GrantView