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


const port = 5175

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`)
    
})