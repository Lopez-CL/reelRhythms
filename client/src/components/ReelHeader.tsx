import React from "react";
import Image from "next/image";
import Link from "next/link";
import NavBar from "./NavBar";
const ReelHeader: React.FC = () => {
    return(
        <header>
            <Link href='/' className="return-link-logo">
                <Image className="logo" aria-hidden="true" src="/reel-cal-med.png" alt="Reel Rhythms logo of a calendar with film reels in each day's box." width={45} height={45}/>
                <h1>Reel Rhythms</h1>
            </Link>
            <NavBar/>
        </header>
        
    )
}

export default ReelHeader;