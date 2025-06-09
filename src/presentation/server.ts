import express, { Router } from "express";
import cookieParser from 'cookie-parser';


interface Options {
    port: number,
    routes: Router
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, routes } = options;

        this.port = port;
        this.routes = routes;
    }

    async start() {

        console.log('Server started...');

        // middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());

        // routes
        this.app.use(this.routes);

        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}