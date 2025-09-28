import Image from "next/image"
export default function Page(){
    return (
    <>
        <h1>Chris is Learning Next.JS</h1>
        <Image src='/profile.png' alt="Chris Lopez" width={200} height={200}/>
    </>
    )
}