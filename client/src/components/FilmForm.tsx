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
                const fetchRes = await fetch('http://localhost:backend/api/films/search',{method: "GET", body:fetchBody});
                const filmData = await fetchRes.json();
                if(!fetchRes.ok) {throw new Error(filmData.err || "Issue with Fetch")}
                setFilmData(filmData);
            }catch(error){
                const errMsg = error instanceof Error&& error.message || null
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