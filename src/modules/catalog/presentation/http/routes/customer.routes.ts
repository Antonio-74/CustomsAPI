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

        /**
         * @swagger
         * /api/v1/customers:
         *   post:
         *     summary: Create a new customer
         *     tags: [Customers]
         *     security:
         *       - bearerAuth: []
         *     requestBody:
         *       required: true
         *       content:
         *         application/x-www-form-urlencoded:
         *           schema:
         *             type: object
         *             required:
         *               - name
         *               - code
         *               - email
         *               - address
         *             properties:
         *               name:
         *                 type: string
         *                 description: Customer's full name
         *                 example: ""
         *               code:
         *                 type: string
         *                 description: Customer's unique identification code
         *                 example: ""
         *               email:
         *                 type: string
         *                 format: email
         *                 description: Customer's valid email address
         *                 example: ""
         *               address:
         *                 type: string
         *                 description: Customer's physical address
         *                 example: ""
         *     responses:
         *       201:
         *         description: Customer successfully created
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: "Customer created successfully"
         *                 data:
         *                   type: number
         *                 errors:
         *                   type: string
         *       400:
         *         description: Validation error or customer already exists
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
         *       401:
         *         description: Unauthorized - Invalid or missing token
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
         *                   type: null
         *       403:
         *         description: Forbidden - User does not have operator role
         *       409:
         *         description: Conflict - Customer code already exists
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: "Customer with this code already exists"
         *       500:
         *         description: Internal server error
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: "Internal server error"
         *                 error:
         *                   type: string
         */
        router.post('/', AuthMiddleware.verifyOpeRole, controller.createRequest);
        
        /**
         * @swagger
         * /api/v1/customers/{id}:
         *   put:
         *     summary: Update an existing customer
         *     tags: [Customers]
         *     security:
         *       - bearerAuth: []
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: Customer ID
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               name:
         *                 type: string
         *                 description: Customer's name
         *                 example: "John Doe"
         *               code:
         *                 type: string
         *                 description: Customer's unique code
         *                 example: "CUST001"
         *               email:
         *                 type: string
         *                 format: email
         *                 description: Customer's email address
         *                 example: "john.doe@example.com"
         *               address:
         *                 type: string
         *                 description: Customer's physical address
         *                 example: "123 Main St, City"
         *     responses:
         *       200:
         *         description: Customer successfully updated
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: "Customer updated successfully"
         *                 data:
         *                   type: object
         *                   properties:
         *                     id:
         *                       type: string
         *                       example: "507f1f77bcf86cd799439011"
         *                     name:
         *                       type: string
         *                       example: "John Doe"
         *                     code:
         *                       type: string
         *                       example: "CUST001"
         *                     email:
         *                       type: string
         *                       example: "john.doe@example.com"
         *                     address:
         *                       type: string
         *                       example: "123 Main St, City"
         *                     active:
         *                       type: boolean
         *                       example: true
         *       400:
         *         description: Validation error
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: "Validation error"
         *                 errors:
         *                   type: array
         *                   items:
         *                     type: string
         *       401:
         *         description: Unauthorized - Invalid or missing token
         *       403:
         *         description: Forbidden - User does not have operator role
         *       404:
         *         description: Customer not found
         *       500:
         *         description: Internal server error
         */
        router.put('/:id', AuthMiddleware.verifyOpeRole, controller.updateRequest);

        /**
         * @swagger
         * /api/v1/customers/{active}:
         *   get:
         *     summary: Get all customers filtered by active status
         *     tags: [Customers]
         *     security:
         *       - bearerAuth: []
         *     parameters:
         *       - in: path
         *         name: active
         *         required: true
         *         schema:
         *           type: boolean
         *         description: Filter customers by active status (true/false)
         *         example: true
         *     responses:
         *       200:
         *         description: List of customers retrieved successfully
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: "Customers retrieved successfully"
         *                 data:
         *                   type: array
         *                   items:
         *                     type: object
         *                     properties:
         *                       id:
         *                         type: string
         *                         example: "507f1f77bcf86cd799439011"
         *                       name:
         *                         type: string
         *                         example: "John Doe"
         *                       code:
         *                         type: string
         *                         example: "CUST001"
         *                       email:
         *                         type: string
         *                         example: "john.doe@example.com"
         *                       address:
         *                         type: string
         *                         example: "123 Main St, City"
         *                       active:
         *                         type: boolean
         *                         example: true
         *       401:
         *         description: Unauthorized - Invalid or missing token
         *       403:
         *         description: Forbidden - User does not have operator role
         *       500:
         *         description: Internal server error
         */
        router.get('/:active', AuthMiddleware.verifyOpeRole, controller.getCustomersRequest);

        /**
         * @swagger
         * /api/v1/customers/by-id/{id}:
         *   get:
         *     summary: Get a customer by ID
         *     tags: [Customers]
         *     security:
         *       - bearerAuth: []
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: Customer's unique ID
         *         example: "507f1f77bcf86cd799439011"
         *     responses:
         *       200:
         *         description: Customer found successfully
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: "Customer retrieved successfully"
         *                 data:
         *                   type: object
         *                   properties:
         *                     id:
         *                       type: string
         *                       example: "507f1f77bcf86cd799439011"
         *                     name:
         *                       type: string
         *                       example: "John Doe"
         *                     code:
         *                       type: string
         *                       example: "CUST001"
         *                     email:
         *                       type: string
         *                       example: "john.doe@example.com"
         *                     address:
         *                       type: string
         *                       example: "123 Main St, City"
         *                     active:
         *                       type: boolean
         *                       example: true
         *       401:
         *         description: Unauthorized - Invalid or missing token
         *       403:
         *         description: Forbidden - User does not have operator role
         *       404:
         *         description: Customer not found
         *       500:
         *         description: Internal server error
         */
        router.get('/by-id/:id', AuthMiddleware.verifyOpeRole, controller.getCustomerRequest);

        /**
         * @swagger
         * /api/v1/customers/status/{id}:
         *   patch:
         *     summary: Toggle customer active status
         *     tags: [Customers]
         *     security:
         *       - bearerAuth: []
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: Customer's unique ID
         *         example: "507f1f77bcf86cd799439011"
         *     responses:
         *       200:
         *         description: Customer status updated successfully
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: "Customer status updated successfully"
         *                 data:
         *                   type: object
         *                   properties:
         *                     id:
         *                       type: string
         *                       example: "507f1f77bcf86cd799439011"
         *                     active:
         *                       type: boolean
         *                       example: false
         *       401:
         *         description: Unauthorized - Invalid or missing token
         *       403:
         *         description: Forbidden - User does not have operator role
         *       404:
         *         description: Customer not found
         *       500:
         *         description: Internal server error
         */
        router.patch('/status/:id', AuthMiddleware.verifyOpeRole, controller.statusCustomerRequest);

        return router;
    }
}