import { useEffect, useState } from "react";
import { data, useLocation } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search)

}

function Menu() {
    const [animes, setAnimes] = useState([])
    const query = useQuery()
    const search = query.get('search')

    useEffect(() => {
        async function loadAnimes() {
            if (search) {
                const filtered = data.filter(anime => 
                    anime.titre.toLowerCase().includes(search.toLocaleLowerCase())
                )
                setAnimes(filtered)
            } else {
                setAnimes(data)
            }
        } 
        loadAnimes
    }, [search])

    return (
        <div>
            <ul>
                {animes.map((anime) => (
                    <li key={anime.id}>{anime.titre}</li>
                ))}
            </ul>
        </div>
    )
}

export default Menu