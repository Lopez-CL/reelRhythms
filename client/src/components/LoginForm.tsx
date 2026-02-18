'use client';
import * as Types from '@/types/index';
import * as Hooks from '@/hooks/index';
import React,{useState} from 'react';
import { useRouter } from 'next/navigation';
import { error } from 'console';

interface LoginDataType {
    email: string,
    password: string
}

const LoginForm: React.FC = ()=>{
    const [userData, setUserData] = useState<LoginDataType>({
        email:"",
        password:""
    })
    const router = useRouter();
    const handleInput = Hooks.useNativeInput(userData, setUserData)
    const handleSubmit = async (e:React.MouseEvent<HTMLElement>) =>{
        e.preventDefault();
        try{
            const resStatus = await fetch("http://localhost:8000/backend/api/users/login",{
                method:"POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email: userData.email, password: userData.password})
            })
            const resData = await resStatus.json();
            if(!resStatus.ok) throw new Error(resData.err || "Issue with login api")
            if(resStatus.ok) router.push('/dashboard');
        }catch(err){
            const errMsg = err instanceof Error ? err.message: null
            console.log(errMsg)
        }
    }
    return(
        <form className="form form-register">
            <input value={userData.email} name='email' type='email' aria-label='email' onChange={handleInput}></input>
            <input value={userData.password} name='password' type='password' aria-label='password' onChange={handleInput}></input>
            <button onClick={handleSubmit}>Submit</button>
        </form>
    )
}
export default LoginForm;