import React from 'react'
import ReelHeader from '@/components/ReelHeader'
import '@/styles/global.css'
import'@/styles/components.css';
export default function RootLayout(
    {children}:{children:React.ReactNode}){
        return(
            <html lang="en">
                <body>
                    <ReelHeader/>
                    {children}
                </body>
            </html>
        )
    }