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

        /**
         * @swagger
         * /api/v1/auth/register:
         *   post:
         *     summary: Register a new user in the system
         *     tags: 
         *       - Auth
         *     requestBody:
         *       required: true
         *       content:
         *         application/x-www-form-urlencoded:
         *           schema:
         *             type: object
         *             required:
         *               - username
         *               - password
         *               - email
         *               - role
         *               - employeeId
         *             properties:
         *               username:
         *                 type: string
         *                 description: Unique username for the account
         *                 example: ''
         *               password:
         *                 type: string
         *                 description: User's password
         *                 example: ''
         *               email:
         *                 type: string
         *                 description: User's email
         *                 example: ''
         *               role:
         *                 type: string
         *                 description: User's role, it has to be 'ADMIN', 'OPE' or 'INS'
         *                 example: ''
         *               employeeId:
         *                 type: number
         *                 description: User's employee ID
         *     responses:
         *       201:
         *         description: User successfully created
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 data:
         *                   type: object
         *                   properties:
         *                     username:
         *                       type: string
         *                     id:
         *                       type: string
         *                 message:
         *                   type: string
         *       400:
         *         description: Validation error or user already exists
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                 data:
         *                   type: null
         *                 errors:
         *                   type: string
         *       500:
         *         description: Internal server error
         *         content:content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                 data: 
         *                   type: null
         *                 errors:
         *                   type: string
         */
        router.post('/register', controller.registerRequest);

        /**
         * @swagger
         * /api/v1/auth/login:
         *   post:
         *     summary: Authenticate an existing user
         *     tags: [Auth]
         *     requestBody:
         *       required: true
         *       content:
         *         application/x-www-form-urlencoded:
         *           schema:
         *             type: object
         *             required:
         *               - username
         *               - password
         *             properties:
         *               username:
         *                 type: string
         *                 description: Username of the existing account
         *                 example: ''
         *               password:
         *                 type: string
         *                 description: User's password
         *                 example: ''
         *     responses:
         *       200:
         *         description: Successful login
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 data:
         *                   type: string
         *                   description: JWT Token
         *         headers:
         *           Set-Cookie:
         *             schema:
         *               type: string
         *               description: HTTP-only cookie containing JWT token
         *       400:
         *         description: Invalid credentials or user does not exist
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                 data:
         *                   type: null
         *                 errors:
         *                   type: string
         *       500:
         *         description: Internal server error
         *         content:content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                 data: 
         *                   type: null
         *                 errors:
         *                   type: string
         */
        router.post('/login', controller.loginRequest);

        return router;
    }
}