import dotenv from 'dotenv'
import mysql from "mysql2/promise"
dotenv.config()

const db = await mysql.createPool({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection()
    .then(() => console.log("Base de données connectée avec succès"))
    .catch((err) => console.error("Erreur de connexion à la base de données: ", err))


export default db