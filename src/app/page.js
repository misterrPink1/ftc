//import React, { useState, useEffect } from 'react'

//import { CsvToHtmlTable } from 'react-csv-to-table';
import Script from 'next/script'
//import { GoogleAnalytics } from '@next/third-parties/google'

import Dashboard from '@/components/dashboard';

export default function Home() {

  const clairtyCode = `
                      (function (c,l,a,r,i,t,y){
                          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                      })(window, document, "clarity", "script", "la3ubph9h5"); `

  return (
    <>
        <Script
          id = "ms-clarity"
          strategy="afterInteractive"
        >{clairtyCode}</Script>
          {/*<GoogleAnalytics gaId="G-G8X2NEPTEG" />*/}
          <div className="p-4 flex flex-col place-items-center">
            
            <Dashboard />
          </div>
    </>
  )
}
