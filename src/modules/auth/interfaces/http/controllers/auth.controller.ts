import { Request, Response } from "express";
import { IFindUserUserCase, ILoginUserUseCase, IRegisterUseCase, IValidateUserUserCase } from "../../../domain/ports";
import { ResponseUtil } from "../../../../../shared/utils";
import { RegisterDto } from "../../../application/dtos";
import { LoginDto } from "../../../application/dtos/login.dto";

export class AuthController {

    constructor(
        private readonly registerUseCase: IRegisterUseCase,
        private readonly findUserUseCase: IFindUserUserCase,
        private readonly validateUserUseCase: IValidateUserUserCase,
        private readonly loginUseCase: ILoginUserUseCase,
    ) {}

    registerRequest = async(req: Request, res: Response): Promise<void> => {
        try {
            const { body } = req;
            const [error, registerDto] = await RegisterDto.create(body);

            // validate if dto has an error
            if(error) {
                ResponseUtil.badRequest(res, error);
                return;
            }

            // check if user already exist
            const user = await this.findUserUseCase.execute(registerDto?.username as string);
            if(user) {
                ResponseUtil.conflict(res, `Username ${registerDto?.username} already exists`);
                return;
            }

            // create user entity and save it
            const newUserEntity = registerDto!.toEntity();
            const createdUser = await this.registerUseCase.execute(newUserEntity);

            ResponseUtil.created(res, createdUser, `User ${newUserEntity.username} created successfully`);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }

    loginRequest = async(req: Request, res: Response) => {
        try {
            const { body } = req;
            const [error, loginDto] = await LoginDto.create(body);

            // validate login dto
            if(error) {
                ResponseUtil.badRequest(res, error);
                return;
            }

            // check if user exists
            const user = await this.findUserUseCase.execute(loginDto!.username);
            if(!user) {
                ResponseUtil.conflict(res, `Username ${loginDto!.username} does not exist!`);
                return;
            }

            // validate user password
            const validateUser = await this.validateUserUseCase.execute(loginDto!.password, user.password);           
            if(!validateUser) {
                ResponseUtil.unauthorized(res, 'Invalid Credentials!');
                return;
            }

            // create user token
            const token = await this.loginUseCase.execute(user);
            if(token == null) {
                ResponseUtil.internalError(res, 'Error in token creation');
                return;
            }

            // save token in a cookie
            res.cookie('token', token, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production', 
                sameSite: 'strict', 
                maxAge: 24 * 60 * 60 * 1000, 
            });

            ResponseUtil.ok(res, token);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }
}