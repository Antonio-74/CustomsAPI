import { Router } from "express";
import { CreateCountryUseCase, GetCountriesUseCase, GetCountryByIdUseCase, UpdateCountryUseCase, StatusCountryUseCase } from "../../../application/use-cases";
import { CountryRepository } from "../../../infraestructure";
import { CountryController } from "../controllers/country.controller";
import { AuthMiddleware } from "../../../../../shared/middlewares/auth.middleware";

export class CountryRoutes {
    static get routes(): Router {
        const router = Router();

        const countryRepository = new CountryRepository();
        const createCountryUseCase = new CreateCountryUseCase(countryRepository);
        const updateCountryUseCase = new UpdateCountryUseCase(countryRepository);
        const getCountriesUseCase = new GetCountriesUseCase(countryRepository);
        const getCountryByIdUseCase = new GetCountryByIdUseCase(countryRepository);
        const statusCountryUseCase = new StatusCountryUseCase(countryRepository);

        const controller = new CountryController(
            createCountryUseCase,
            updateCountryUseCase,
            getCountriesUseCase,
            getCountryByIdUseCase,
            statusCountryUseCase
        );

        router.post('/', AuthMiddleware.verifyOpeRole, controller.createCountryRequest);
        router.put('/:id', AuthMiddleware.verifyOpeRole, controller.updateCountryRequest);
        router.get('/:active', AuthMiddleware.verifyOpeRole, controller.getCountriesRequest);
        router.get('/by-id/:id', AuthMiddleware.verifyOpeRole, controller.getCountryByIdRequest);
        router.patch('/status/:id', AuthMiddleware.verifyOpeRole, controller.statusCountryRequest);

        return router;
    }
}