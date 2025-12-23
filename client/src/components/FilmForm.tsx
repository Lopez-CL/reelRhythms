'use client'
import {FilmType} from '@/types/filmType';
import { useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';


const FilmForm: React.FC<{
    filmData: FilmType[],
    setFilmData: Dispatch<SetStateAction<FilmType[]>>}> = ({filmData, setFilmData})  =>{
        const [formData, setFormData] = useState<string>('');
        const handleSubmit = async (e:React.MouseEvent<HTMLElement>) =>{
            e.preventDefault();
            const fetchBody = new FormData();
            fetchBody.append('query', formData);
            try{
                fetch('')
            }
        }
    return(
        <>
            
        </>
    )
}

export default FilmForm;