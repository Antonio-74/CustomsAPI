import { ResultSetHeader } from 'mysql2/promise';
import { pool } from '../config';

type DataRecord = Record<string, string | number | boolean | null>;

export class MySqlUtil {

    static async find<T>(sql: string, params: (string | number | boolean | null)[] = []): Promise<T[]> {
        const [rows] = await pool.execute(sql, params);
        return rows as T[];
    } 

    static async findOne<T>(sql: string, params: (string | number | boolean | null)[] = []): Promise<T> {
        const [rows] = await pool.execute(sql, params);
        const result = rows as T[];
        return result[0];
    }

    static async insert<T extends DataRecord>(table: string, data: T): Promise<number> {
        const keys = Object.keys(data);
        const values = Object.values(data);
        const placeholders = keys.map(() => '?').join(', ');
        const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`;

        const [result] = await pool.execute<ResultSetHeader>(sql, values);
        return result.insertId;
    }

    static async update<T extends DataRecord, W extends DataRecord>(table: string, data: T, where: W): Promise<number> {
        const setCaluse = Object.keys(data).map(k => `${k} = ?`).join(', ');
        const whereClause = Object.keys(where).map(k => `${k} = ?`).join(' AND');

        const sql = `UPDATE ${table} SET ${setCaluse} WHERE ${whereClause}`;
        const values = [...Object.values(data), ...Object.values(where)];

        const [result] = await pool.execute<ResultSetHeader>(sql, values);
        return result.affectedRows;
    }

    static async remove<W extends DataRecord>(table: string, where: W): Promise<number> {
        const whereClause = Object.keys(where).map(k => `${k} = ?`).join(' AND ');
        const sql = `DELETE FROM ${table} WHERE ${whereClause}`;
        const values = Object.values(where);

        const [result] = await pool.execute<ResultSetHeader>(sql, values);
        return result.affectedRows;
    }

    static async callProcedure<T>(procedureName: string, params: (string | number | boolean | null)[] = []): Promise<T[]> {
        const placeholders = params.map(() => '?').join(', ');
        const sql = `CALL ${procedureName}(${placeholders})`;
        const [rows] = await pool.query(sql, params);
        
        // El resultado de CALL puede venir como [[rows], other]
        return Array.isArray(rows) ? (rows[0] as T[]) : [];
    }
}