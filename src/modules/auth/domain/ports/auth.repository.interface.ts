import { UserEntity } from "../entities/user.entity";

export interface IAuthRepository {
    register(user: UserEntity): Promise<number>;
    findUser(username: string): Promise<UserEntity>;
}