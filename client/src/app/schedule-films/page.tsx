'use client'
import FilmForm from '@/components/FilmForm';
import {FilmType} from '@/types/filmType';
import { useState } from 'react';
export default function Page(){
        const [filmData, setFilmData] = useState<FilmType[]>([]);
    return(
        <>
            <h1>Cue your Calendar</h1>
            <hr/>
            <section>
                <h2>Explore Films</h2>
                    <FilmForm setFilmData={setFilmData} ></FilmForm>
            </section>
        </>
    )
}