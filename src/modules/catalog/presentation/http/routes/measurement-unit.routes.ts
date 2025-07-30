import { Router } from "express";
import { MeasurementUnitRepository } from "../../../infraestructure";
import { CreateMeasurementUnitUseCase, GetMeasurementUnitByIdUseCase, GetMeasurementUnitsUseCase, StatusMeasurementUnitUseCase, UpdateMeasurementUnitUseCase } from "../../../application/use-cases";
import { MeasurementUnitController } from "../controllers/measurement-unit.controller";
import { AuthMiddleware } from "../../../../../shared/middlewares";

export class MeasurementUnitRoutes {

    static get routes(): Router {

        const router = Router();

        const measurementUnitRepository = new MeasurementUnitRepository();
        const createMeasurementUnitUseCase = new CreateMeasurementUnitUseCase(measurementUnitRepository);
        const updateMeasurementUnitUseCase = new UpdateMeasurementUnitUseCase(measurementUnitRepository);
        const getMeasurementUnitsUseCase = new GetMeasurementUnitsUseCase(measurementUnitRepository);
        const getMeasurementUnitByIdUseCase = new GetMeasurementUnitByIdUseCase(measurementUnitRepository);
        const statusMeasurementUnitUseCase = new StatusMeasurementUnitUseCase(measurementUnitRepository);

        const controller = new MeasurementUnitController(
            createMeasurementUnitUseCase, 
            updateMeasurementUnitUseCase, 
            getMeasurementUnitsUseCase, 
            getMeasurementUnitByIdUseCase, 
            statusMeasurementUnitUseCase
        );

        router.post('/', AuthMiddleware.verifyOpeRole, controller.createMeasurementUnitRequest);
        router.put('/:id', AuthMiddleware.verifyOpeRole, controller.updateMeasurementUnitRequest);
        router.get('/:active', AuthMiddleware.verifyOpeRole, controller.getMeasurementUnitsRequest);
        router.get('/by-id/:id', AuthMiddleware.verifyOpeRole, controller.getMeasurementUnitByIdRequest);
        router.patch('/status/:id', AuthMiddleware.verifyOpeRole, controller.statusMeasurementUnitRequest);

        return router;
    }
}