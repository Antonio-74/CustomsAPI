import { UserEntity } from "../../domain/entities";
import { IAuthRepository, IFindUserUserCase } from "../../domain/ports";

export class FindUserUseCase implements IFindUserUserCase {
    
    constructor(
        private readonly authRepository: IAuthRepository
    ) {}

    execute(username: string): Promise<UserEntity> {
        return this.authRepository.findUser(username);
    }
}