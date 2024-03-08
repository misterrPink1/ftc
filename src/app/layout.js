import Nav from '@/components/nav';
import Link from 'next/link'

import { StateProvider } from '@/context/stateContext'

import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <StateProvider>
          <Nav/>
          <div>
            {children}
          </div>
          <div className="w-full">
              <div className='text-xxs max-w-48 text-center mx-auto'>Lets change fundraising together, and protect founders and innovators.<div></div> Don't forget to upvote 🥰</div>
              <div className="max-w-48 mx-auto">
                <Link href="https://www.producthunt.com/posts/free-the-creator?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-free&#0045;the&#0045;creator" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=443245&theme=dark" alt="Free The Creator - $750 million in grants awaits your single click | Product Hunt" style={{ width: 250, height: 54 }} width="250" height="54" /></Link>
              </div>              
          </div>
        </StateProvider>
      </body>
    </html>
  )
}
