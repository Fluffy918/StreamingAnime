import axios from "axios";
import cheerio from 'cheerio'
import db from './db.js'

const BASE_URL = 'https://anime-sama.fr/catalogue/index.php?page='

async function scrapePage(pageNumber) {
    try {
        const {data} = await axios.get(`${BASE_URL}${pageNumber}`);
        const $ = cheerio.load(data);

        const animes = [];

        $('body').find('div').each((i, el) => {
            const title = $(el).find('strong').text().trim();
            const genres = $(el).text().split('\n')[1]?.trim();

            if (title && genres) {
                animes.push({ title, genres })
            }
        });

        const conn = await db.getConnection();
        for (const anime of animes) {
            await conn.query(
                'INSERT INTO animes (title, genre) VALUES (?, ?)'
                [anime.title, anime.genres]
            );
        }
        conn.release();

        console.log(`Page ${pageNumber} : ${animes.length} animes ajoutés.`);
    } catch (error) {
        console.error(`Erreur lors du sracp de la page ${pageNumber}: `, error.message);
    }
}

(async () => {
    for (let i = 1; i <= 35; i++) {
        await scrapePage(i)
    }
})();


