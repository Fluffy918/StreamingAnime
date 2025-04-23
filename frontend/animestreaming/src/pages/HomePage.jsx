import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/HomePage.css";

function HomePage() {
    const [animes, setAnimes] = useState([]);

    useEffect(() => {
        axios.get('/api/animes')
            .then((res) => {
                console.log("Données reçues: ", res.data);
                if (Array.isArray(res.data)) {
                    setAnimes(res.data)
                } else {
                    console.warn("res.data n'est pas un tableau !");
                    setAnimes([]);
                }
            })
            .catch((err) => {
                console.error("Erreur API: ", err);
                setAnimes([]);
            });
    }, []);

    console.log("animes: ", animes);
    
    return(
        <div className="homepage-container">
            <h1 className="homepage-title">Animes disponibles</h1>
            <div className="anime-grid">
                {Array.isArray(animes) && animes.length > 0 ? (
                    animes.map((animes) => (
                        <div className="anime-card" key={animes.id}>
                            <img src={animes.cover_url} alt={animes.titre} className="anime-image"/>
                            <div className="anime-info">
                                <h2>{animes.titre}</h2>
                                <p>{animes.description}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="anime-error">Aucun anime trouvé ou chargement en cours...</p>
                )}
            </div>
        </div>
    )
}

export default HomePage