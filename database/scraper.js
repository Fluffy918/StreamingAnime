import axios from "axios";
import * as cheerio from 'cheerio'
import db from './db.js'

const BASE_URL = 'https://anime-sama.fr/catalogue/index.php?page='

async function scrapePage(pageNumber) {
    try {
        const {data} = await axios.get(`${BASE_URL}${pageNumber}`);
        const $ = cheerio.load(data);

        const animes = [];

        $('#list_catalog > div').each((_, element) => {
            const title = $(element).find('h1').text().trim();
            const description = $(element).find('p.italic').text().trim();
            const genre = $(element).find('p.text-gray-300').text().trim();
            const cover_url = $(element).find('img').attr('src');

            if (title && cover_url) {
                animes.push({
                    title,
                    description,
                    genre,
                    cover_url: cover_url.startsWith('http') ? cover_url : 'https:' + cover_url
                })
            }
        });

        const conn = await db.getConnection();
        for (const anime of animes) {
            await conn.query(
                'INSERT INTO animes (title, description, genre, cover_url) VALUES (?, ?, ?, ?)',
                [anime.title, anime.description, anime.genres, anime.cover_url]
            );
        }
        conn.release();

        console.log(`Page ${pageNumber} : ${animes.length} animes ajoutés.`);
    } catch (error) {
        console.error(`Erreur lors du sracp de la page ${pageNumber}: `, error.message);
    }
}

(async () => {
    for (let i = 1; i <= 10; i++) {
        await scrapePage(i)
    }
})();


