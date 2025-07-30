import { Router } from "express";
import { EmployeeRepository } from "../../../infraestructure/repository/employee.repository";
import { CreateEmployeeUseCase, GetEmployeeByIdUseCase, GetEmployeeUseCase, StatusEmployeeUseCase, UpdateEmployeeUseCase } from "../../../application/use-cases";
import { EmployeeController } from "../controllers/employee.controller";
import { AuthMiddleware } from '../../../../../shared/middlewares/auth.middleware';

export class EmployeeRoutes {

    static get routes(): Router {

        const router = Router();

        const employeeRepository = new EmployeeRepository();
        const createEmployeeUseCase = new CreateEmployeeUseCase(employeeRepository);
        const updateEmployeeUseCase = new UpdateEmployeeUseCase(employeeRepository);
        const getEmployeeByIdUseCase = new GetEmployeeByIdUseCase(employeeRepository);
        const getEmployeesUseCase = new GetEmployeeUseCase(employeeRepository);
        const statusEmployeeUseCase = new StatusEmployeeUseCase(employeeRepository);

        const controller = new EmployeeController(
            createEmployeeUseCase,
            updateEmployeeUseCase,
            getEmployeeByIdUseCase,
            getEmployeesUseCase,
            statusEmployeeUseCase
        );

        router.post('/', AuthMiddleware.verifyOpeRole, controller.createEmployeeRequest);
        router.put('/:id', AuthMiddleware.verifyOpeRole, controller.updateEmployeeRequest);
        router.get('/by-id/:id', AuthMiddleware.verifyOpeRole, controller.getEmployeeByIdRequest);
        router.get('/:active', AuthMiddleware.verifyOpeRole, controller.getEmployeesRequest);
        router.patch('/status/:id', AuthMiddleware.verifyOpeRole, controller.statusEmployeeRequest);

        return router;
    }
}