import { Router } from "express";
import { CustomerRepository } from "../../../infraestructure";
import { CustomerController } from "../controllers/customer.controller";
import { AuthMiddleware } from "../../../../../shared/middlewares";
import { 
    CreateUseCase, 
    GetCustomerByCodeUseCase, 
    GetCustomerByIdUseCase, 
    GetCustomersUseCase, 
    StatusCustomerUseCase, 
    UpdateUseCase } from "../../../application/use-cases";

export class CustomerRoutes {

    static get routes(): Router {

        const router = Router();

        const customerRepository = new CustomerRepository();
        const createUseCase = new CreateUseCase(customerRepository);
        const updateUseCase = new UpdateUseCase(customerRepository);
        const getCustomerByCodeUseCase = new GetCustomerByCodeUseCase(customerRepository);
        const getCustomerByIdUseCase = new GetCustomerByIdUseCase(customerRepository);
        const getCustomersUseCase = new GetCustomersUseCase(customerRepository);
        const statusCustomerUseCase = new StatusCustomerUseCase(customerRepository);

        const controller = new CustomerController(
            createUseCase,
            updateUseCase,
            getCustomerByCodeUseCase,
            getCustomerByIdUseCase,
            getCustomersUseCase,
            statusCustomerUseCase
        );

        router.post('/', AuthMiddleware.verifyOpeRole, controller.createRequest);
        router.put('/:id', AuthMiddleware.verifyOpeRole, controller.updateRequest);
        router.get('/:active', AuthMiddleware.verifyOpeRole, controller.getCustomersRequest);
        router.get('/by-id/:id', AuthMiddleware.verifyOpeRole, controller.getCustomerRequest);
        router.patch('/status/:id', AuthMiddleware.verifyOpeRole, controller.statusCustomerRequest);

        return router;
    }
}