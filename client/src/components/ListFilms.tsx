'use client'
import { FilmType } from "@/types/filmType"

const ListFilms: React.FC<{ filmData: FilmType[][] }> = ({ filmData }) => {
    const filmSet: FilmType[] =filmData?.length > 0?
        [...new Set(filmData.flat().map(film => film.imdbID))]
            .map(id => filmData.flat().find(f => f.imdbID === id)!):[]
    return (
        <>
            {filmData?.length > 0 ?
                filmSet.map(film => 
                <p key={film.imdbID}>{`${film.Title}, ${film.Year}`}</p>):<p>No films yet</p>
            }
        </>
    )
}

export default ListFilms;