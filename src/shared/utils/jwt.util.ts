import jwt, { SignOptions } from 'jsonwebtoken';
import { envs } from '../config';

export class JwtUtil {
    static async generateToken(payload: { id: number, role: string}, duration: string = '2h'): Promise<string | null> {
        return new Promise((resolve) => {
            jwt.sign(payload, envs.JWT_SEED, {expiresIn: duration} as SignOptions, (err, token) => {
                if(err) return resolve(null);

                resolve(token as string);
            });
        });
    }

    static async validateToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, envs.JWT_SEED, (err, decoded) => {
                if(err) return resolve(null);

                resolve(decoded as T);
            });
        });
    }
}