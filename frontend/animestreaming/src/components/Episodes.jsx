import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";
import "../css/Episode.css"

function Episodes() {
    const {animeId} = useParams()
    console.log("animeId récupéré: ", animeId);

    const [episodes, setEpisodes] = useState([])
    const [animeInfo, setAnimeInfo] = useState(null)

    useEffect(() => {
        if (animeId) {
            fetch(`http://localhost:5173/api/animes/${animeId}`)
                .then((res) => res.json())
                .then((data) => setEpisodes(data))
                .catch((err) => console.error("Erreur lors de la récupération des épisodes: ", err))

            fetch(`http://localhost:5173/api/animes/${animeId}/info`)
                .then((res) => res.json())
                .then((data) => setAnimeInfo(data))
                .catch((err) => console.error("Erreur lors de la récupération des infos de l'anime: ", err))
        } else {
            console.warn("AnimeId is undifined")
        }
    }, [animeId])

    return (
        <>
            <Nav/>
            <br />
            <br />
            <div className="episodes-container">
                <h2>
                    Liste des épidsodes de {animeId}
                </h2>
                {animeInfo && (
                    <div className="anime-header">
                        <div className="episode-infos">
                            <h3>{animeInfo.titre}</h3>
                            <p>{animeInfo.description}</p>
                        </div>
                    </div>
                )}
                <ul className="episodes-liste">
                    {episodes.map((episode) => (
                        <li key={episode.id} className="episode-item"> 
                            <a href={episode.video_url}>
                                Episode {episode.episode_number}: {episode.video_url}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer/>
        </>
    )
    
}

export default Episodes