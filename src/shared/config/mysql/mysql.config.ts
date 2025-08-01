import mysql from 'mysql2/promise';
import { envs } from '../env-var.config';

export const pool = mysql.createPool({
    host: envs.DB_HOST,
    user: envs.DB_USER,
    password: envs.DB_PASSWORD,
    database: envs.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});