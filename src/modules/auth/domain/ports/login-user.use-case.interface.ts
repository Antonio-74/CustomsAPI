import { UserEntity } from "../entities";

export interface ILoginUserUseCase {
    execute(user: UserEntity): Promise<string | null>;
}