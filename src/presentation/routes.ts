import { Router } from "express";
import { CustomerRoutes } from '../modules/catalog/interfaces/http/routes/customer.route';
import { SupplierRoutes } from '../modules/catalog/interfaces/http/routes/supplier.route';
import { AuthRoutes } from './../modules/auth/interfaces/http/routes/auth.routes';
import { EmployeeRoutes } from "../modules/catalog/interfaces/http/routes/employee.route";
import { DocumentTypeRoutes } from "../modules/catalog/interfaces/http/routes/document-type.route";

export class AppRoute {

    static get routes(): Router {

        const router = Router();

        router.use('/api/v1/auth', AuthRoutes.routes);
        router.use('/api/v1/customers', CustomerRoutes.routes);
        router.use('/api/v1/suppliers', SupplierRoutes.routes);
        router.use('/api/v1/employees', EmployeeRoutes.routes);
        router.use('/api/v1/document-types', DocumentTypeRoutes.routes);

        return router;
    }
}