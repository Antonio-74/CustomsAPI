import { UserEntity } from "../entities";

export interface IFindUserUserCase {
    execute(username: string): Promise<UserEntity>;
}