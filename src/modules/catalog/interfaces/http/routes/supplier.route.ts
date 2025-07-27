import { Router } from "express";
import { AuthMiddleware } from "../../../../../shared/middlewares";
import { SupplierRepository } from "../../../infraestructure";
import { CreateSupplierUseCase, GetSupplierByIdUseCase, StatusSupplierUseCase, UpdateSupplierUseCase } from "../../../application/use-cases";
import { GetSuppliersUseCase } from '../../../application/use-cases/supplier/get-suppliers.use-case';
import { SupplierController } from "../controllers/supplier.controller";

export class SupplierRoutes {

    static get routes(): Router {

        const router = Router();

        const supplierRepository = new SupplierRepository();
        const createSupplierUseCase = new CreateSupplierUseCase(supplierRepository);
        const updateSupplierUseCase = new UpdateSupplierUseCase(supplierRepository);
        const getSupplierByIdUseCase = new GetSupplierByIdUseCase(supplierRepository);
        const getSuppliersUseCase = new GetSuppliersUseCase(supplierRepository);
        const statusSupplierUseCase = new StatusSupplierUseCase(supplierRepository);
        
        const controller = new SupplierController(
            createSupplierUseCase,
            updateSupplierUseCase,
            getSupplierByIdUseCase,
            getSuppliersUseCase,
            statusSupplierUseCase
        );

        router.post('/', AuthMiddleware.verifyOpeRole, controller.createSupplierRequest);
        router.put('/:id', AuthMiddleware.verifyOpeRole, controller.updateSupplierRequest);
        router.get('/by-id/:id', AuthMiddleware.verifyOpeRole, controller.getSupplierByIdRequest);
        router.get('/:idCustomer/:active', AuthMiddleware.verifyOpeRole, controller.getSuppliersRequest);
        router.patch('/status/:id', AuthMiddleware.verifyOpeRole, controller.statusSupplierRequest);

        return router;
    }
}