import React from "react";
import "../css/AnimeCard.css"

function AnimeCard({anime}) {
    return (
        <div className="anime-card">
            <img src={anime.cover_url} alt={anime.title} className=""/>
            <div className="anime-card-content">
                <h3 className="anime-card-title">{anime.title}</h3>
                <p className="anime-card-desc">
                    {anime.description.slice(0, 120)}...
                </p>
            </div>
        </div>
    )
}

export default AnimeCard