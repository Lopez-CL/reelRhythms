import React from "react";
import Link from "next/link";
import * as Types from '../types/index'
import * as Icons from '../icons'
const NavBar: React.FC = () =>{
    return(
        <nav>
            <Link href="/register">Create Account</Link>
            <Icons.LinkDivider  />
            <Link href="/login">Login</Link>
            <Icons.LinkDivider  />
            <Link href="/schedule-films">Schedule your Films</Link>
            <Icons.LinkDivider  />
            <Link href="/explore-films">Explore Film Calendars</Link>
        </nav>
    )
} 

export default NavBar;