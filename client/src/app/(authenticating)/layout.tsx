import React from "react";
import '@/styles/global.css';
import Image from "next/image";
export default function AuthenticateView({ children }: { children: React.ReactNode }) {
    return (

        <div className="flex-50-50">
            <section>
                <Image src='/cal_film.png' alt="''" width={500} height={500} />
            </section>
            <section>
                {children}
            </section>
        </div>

    )
}