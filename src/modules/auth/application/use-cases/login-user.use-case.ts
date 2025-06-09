import { JwtUtil } from "../../../../shared/utils";
import { UserEntity } from "../../domain/entities";
import { ILoginUserUseCase } from "../../domain/ports";

export class LoginUserUseCase implements ILoginUserUseCase {
    execute(user: UserEntity): Promise<string | null> {
        const { id, role } = user;
        const token = JwtUtil.generateToken({ id, role});

        return token;
    }
}