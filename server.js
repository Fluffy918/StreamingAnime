import express from 'express';
import cors from 'cors';
import db from './database/db.js';

const app = express();
app.use(express.json());
app.use(cors());



app.get('/api/animes', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM animes')
        res.json(rows)
    } catch (error) {
        console.error('Erreur lors de la récupération des animes: ', error)
        res.status(500).json({error: 'Erreur serveur'})
        
    }
})

app.get('/api/animes/:animeId', async (req, res) => {
    const animeId = req.params.animeId
    console.log("animeId reçu: ", animeId)

    const query = 'SELECT * FROM episodes WHERE anime_id = ? ORDER BY episode_number DESC'
    db.query(query, [animeId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({message: 'Erreur serveur'})
        }

        if (results.length > 0) {
            res.json(results)
        } else {
            res.status(404).json({message: 'Aucun épisode trouvé'})
        }
    })
})

app.get('/api/animes/:animeId/info', async (req, res) => {
    const animeId = req.params.animeId
    const query = 'SELECT * FROM animes WHERE id = ?'

    db.query(query, [animeId], (err, results) => {
        if (err) return res.status(500).json({message: 'Erreur serveur'});
        if (results.length === 0) return res.status(404).json({message: 'Aucun anime trouvé'});

        res.json(results[0])
    })

})

app.post('/api/animes', async (req, res) => {
    try {
        const {anime_id, episode_number, video_url} = req.body
        if (!anime_id || !episode_number || !video_url) {
            return res.status(400).json({message: 'Tous les champs sont requis'})
        }

        const [result] = await db.execute(
            'INSERT INTO episodes (anime_id, episode_number, video_url) VALUES (?, ?, ?)',
            [anime_id, episode_number, video_url]
        )

        res.status(201).json({message: "Episode ajouté avec succès !"})
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'épisode: ", error);
        res.status(500).json({message: 'Erreur serveur'})
    }
})

const port = 5175

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`)
    
})