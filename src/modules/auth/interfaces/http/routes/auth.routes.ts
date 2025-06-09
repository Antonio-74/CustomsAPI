import { Router } from "express";
import { FindUserUseCase, LoginUserUseCase, RegisterUseCase, ValidateUserUseCase } from "../../../application/use-cases";
import { AuthRepository } from "../../../infraestructure/repositories";
import { AuthController } from "../controllers/auth.controller";

export class AuthRoutes {

    static get routes(): Router {

        const router = Router();

        const authRepository = new AuthRepository();
        const findUserUseCase = new FindUserUseCase(authRepository);
        const registerUseCase = new RegisterUseCase(authRepository);
        const validateUserUseCase = new ValidateUserUseCase();
        const loginUseCase = new LoginUserUseCase();

        const controller = new AuthController(
            registerUseCase, 
            findUserUseCase, 
            validateUserUseCase, 
            loginUseCase
        );

        router.post('/register', controller.registerRequest);
        router.post('/login', controller.loginRequest);

        return router;
    }
}