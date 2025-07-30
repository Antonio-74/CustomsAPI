import { Router } from "express";
import { AuthRoutes } from "../modules/auth/interfaces/http/routes/auth.routes";
import { 
    CustomerRoutes, 
    SupplierRoutes, 
    EmployeeRoutes, 
    DocumentTypeRoutes, 
    CountryRoutes, 
    MeasurementUnitRoutes 
} from "../modules/catalog/presentation/http/routes";


export class AppRoute {

    static get routes(): Router {

        const router = Router();

        router.use('/api/v1/auth', AuthRoutes.routes);
        router.use('/api/v1/customers', CustomerRoutes.routes);
        router.use('/api/v1/suppliers', SupplierRoutes.routes);
        router.use('/api/v1/employees', EmployeeRoutes.routes);
        router.use('/api/v1/document-types', DocumentTypeRoutes.routes);
        router.use('/api/v1/countries', CountryRoutes.routes);
        router.use('/api/v1/measurement-units', MeasurementUnitRoutes.routes);

        return router;
    }
}