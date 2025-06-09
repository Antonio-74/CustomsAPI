import { Response } from "express";

export class ResponseUtil {
    
    public static ok<T>(res: Response, data: T, message = 'OK') {
        return res.status(200).json({
            message,
            data,
            errors: null
        });
    }

    public static created<T>(res: Response, data: T, message = 'Resource created successfully') {
        return res.status(201).json({
            message,
            data,
            errors: null
        });
    }

    public static internalError(res: Response, errors: string, message = 'Something went wrong') {
        return res.status(500).json({
            message,
            data: null,
            errors
        });
    }

    public static notFound(res: Response, message = 'Resource not found') {
        return res.status(404).json({
            message,
            data: null,
            errors: null
        });
    }

    public static badRequest(res: Response, errors: string | null = null, message = 'Bad request') {
        return res.status(400).json({
            message,
            data: null,
            errors
        });
    }

    public static unauthorized(res: Response, message = 'Unauthorized') {
        return res.status(401).json({
            message,
            data: null,
            errors: null
        });
    }
}