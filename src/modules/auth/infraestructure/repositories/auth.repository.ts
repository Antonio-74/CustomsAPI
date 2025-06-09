import { MySqlUtil } from "../../../../shared/utils";
import { UserEntity } from "../../domain/entities";
import { IAuthRepository } from "../../domain/ports";

export class AuthRepository implements IAuthRepository {
    async register(user: UserEntity): Promise<number> {
        const { username, password, email, role, employeeId, active } = user;

        const userSavedId = await MySqlUtil.insert('users', {
            username,
            password,
            email,
            role,
            employeeId,
            active
        });

        return userSavedId;
    }

    async findUser(username: string): Promise<UserEntity> {
        const user = await MySqlUtil.findOne<UserEntity>(
            'SELECT username, password, email, role FROM users WHERE username = ? ORDER BY id LIMIT 1',
            [username]
        );

        return user;
    }
}