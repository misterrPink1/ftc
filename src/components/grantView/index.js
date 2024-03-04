"use client"

import { useState, useEffect, useMemo } from "react"
import Link from 'next/link'

import { useMyState  } from '@/context/stateContext'
import { useUser } from '@/lib/hooks';

import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

import { IoArrowUp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";




const GrantView = () => {
    const user = useUser()
    const [colDefs, setColDefs] = useState();
    const [data, setData] = useState()


    /*
     * Context hooks
     */
    
    const contextState = useMyState()
    // Safely access context values with optional chaining
    const aiOpen = contextState?.aiOpen;
    const setAiOpen = contextState?.setAiOpen;
    const working = contextState?.working;
    const setWorking = contextState?.setWorking;

    //Apply settings across all columns
    const defaultColDef = useMemo(() => ({
        filter: true, // Enable filtering on all columns
        resizable: true,
    }))
    
    useEffect(()=>{
        if(!data){
            fetch('api/grants') // Fetch data from server
            .then(result => result.json()) // Convert to JSON
            .then(rowData => setData(rowData.data)); // Update state of `rowData`

            setColDefs([
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
              ])
        }
    }, [])


    return(
        <div className="p-10 w-screen">
            <div className="text-xs flex flex-col gap-1">
                <div className="pb-2">Hi I am <Link href="https://twitter.com/misterrpink1" className="underline">@misterrpink</Link>,</div>
                <div>I have tried to keep this list as simple as possible</div>
                <div>🤏 You can click on each column to sort by the given column values</div>
                <div>📐 All columns are resizable</div>
                <div className="pt-2">😃 If Location, "For Whom", Deadline are empty, it means there are none specified, location agnostic, rolling deadline and for everyone </div>
                <div>🔗 Double click on Link to copy it</div>
                <div>
                    When you hover over a column heaer you can click on the hamburger icon to more granular filters. 
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
        </div>
    )
}

export default GrantView