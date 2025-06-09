import { CustomerRoutes } from '../modules/catalog/interfaces/http/routes/customer.route';
import { AuthRoutes } from './../modules/auth/interfaces/http/routes/auth.routes';
import { Router } from "express";

export class AppRoute {

    static get routes(): Router {

        const router = Router();

        router.use('/api/v1/auth', AuthRoutes.routes);
        router.use('/api/v1/customers', CustomerRoutes.routes);

        return router;
    }
}