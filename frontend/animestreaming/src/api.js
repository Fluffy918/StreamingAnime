const API_URL = "http://localhost:5175/api";

async function fetchAnimes(search = '') {
    try {
        const url = search
            ? `${API_URL}/animes/search?q=${encodeURIComponent(search)}`
            : `${API_URL}/animes`;
        
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error(`Erreur HTTP: ${res.status}`);
        }

        const data = await res.json()
        console.log('Données reçues: ', data)

        return data;
        
        
    } catch (error) {
        console.error('Erreur lors du chargement des animés: ', error);
        return [];
        
    }
}

export default fetchAnimes