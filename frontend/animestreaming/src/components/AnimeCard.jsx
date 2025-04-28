import React, { useEffect, useState } from "react";
import "../css/AnimeCard.css"
import { Link, useLocation } from "react-router-dom";
import fetchAnimes from "../api";

function AnimeCard() {
    const [animes, setAnimes] = useState([])
    const location = useLocation()

    const searchParams = new URLSearchParams(location.search)
    const search = searchParams.get('search') || '';

    useEffect(() => {
        const loadAnimes = async () => {
            const data = await fetchAnimes(search)
            setAnimes(Array.isArray(data) ? data : [])
        }
        loadAnimes();
    }, [search])

    return (
        <div className="anime-card">
            {animes.length > 0 ? (
                animes.map(anime => (
                    <div key={anime.id} className="anime-card-content">
                        <Link to={`/animes/${anime.id}`}>
                            <img src={anime.cover_url} alt={anime.title} className="anime-card-image"/>
                        </Link>
                        <h3 className="anime-card-title">{anime.title}</h3>
                        <p className="anime-card-desc">
                            {anime.description.slice(0, 120)}...
                        </p>
                    </div>
                ))
            ) : (
                <p>Aucun animé trouvé.</p>
            )}
        </div>
    )
}

export default AnimeCard