'use client'
import {FilmType} from '@/types/filmType';
import { useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';


const FilmForm: React.FC<{setFilmData: Dispatch<SetStateAction<FilmType[]>>}> = ({setFilmData})  =>{
        const [formData, setFormData] = useState<string>('');
        const handleSubmit = async (e:React.MouseEvent<HTMLElement>) =>{
            e.preventDefault();
            const fetchBody = new FormData();
            fetchBody.append('query', formData);
            try{
                const fetchRes = await fetch('http://localhost:8000/backend/api/films/search',{method: "POST",headers:{'Content-Type':'application/json'},body: JSON.stringify({query:formData}),credentials:'include'});
                const filmData = await fetchRes.json();
                if(!fetchRes.ok) {throw new Error(filmData.err || "Issue with Fetch")}
                console.log(filmData);
                // setFilmData(filmData);
            }catch(error){
                const errMsg = error instanceof Error&& error.message || null
                console.log(errMsg)
            }
        }
    return(
        <>
            <form>
                <input aria-label='Search Query' type="text" name='query' onChange={e =>setFormData(e.currentTarget.value)}/>
                <button type='submit' onClick={handleSubmit}>Submit Film Query</button>
            </form>
        </>
    )
}

export default FilmForm;