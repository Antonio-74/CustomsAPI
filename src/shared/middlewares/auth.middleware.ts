import { NextFunction, Request, Response } from "express";
import { JwtUtil, ResponseUtil } from "../utils";

interface TokenPayload {
    role: string;
    iat?: number;
    exp?: number;
}

export class AuthMiddleware {

    static async verifyOpeRole(req: Request, res: Response, next: NextFunction) {
        
        const token = req.cookies.token;

        if(!token) {
            ResponseUtil.unauthorized(res, `Token not found!`);
            return;
        }

        try {
            const decoded = await JwtUtil.validateToken<TokenPayload>(token);

            if(!decoded) {
                ResponseUtil.unauthorized(res, 'invalid or exipred Token!');
                return;
            }

            if(decoded.role !== 'OPE' && decoded.role !== 'ADMIN') {
                ResponseUtil.unauthorized(res, 'Access denied!');
                return;
            }

            next();
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }
}