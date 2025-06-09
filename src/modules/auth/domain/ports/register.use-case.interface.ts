import { UserEntity } from "../entities";

export interface IRegisterUseCase {
    execute(user: UserEntity): Promise<number>;
}