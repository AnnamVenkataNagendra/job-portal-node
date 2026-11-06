import mysql from 'mysql2';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();
const con = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    ssl: {
        ca: fs.readFileSync('./Certificate/ca.pem'),
        rejectUnauthorized: true
    }
});

con.getConnection((err, connection) => {
    if (err) {
        console.error('MySQL connection failed:', err.message);
        return;
    }

    console.log('Aiven MySQL connected successfully!');
    connection.release();
});

export default con;