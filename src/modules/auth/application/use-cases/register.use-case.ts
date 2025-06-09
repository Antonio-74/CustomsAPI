import { BcryptUtil } from "../../../../shared/utils";
import { UserEntity } from "../../domain/entities";
import { IAuthRepository, IRegisterUseCase } from "../../domain/ports";

export class RegisterUseCase implements IRegisterUseCase {
    
    constructor (
        private readonly authRepository: IAuthRepository
    ) {}

    async execute(user: UserEntity): Promise<number> {   
        user.password = await BcryptUtil.hash(user.password);
        return this.authRepository.register(user);    
    }
}