import { BcryptUtil } from "../../../../shared/utils";
import { IValidateUserUserCase } from "../../domain/ports";

export class ValidateUserUseCase implements IValidateUserUserCase {
    async execute(password: string, comparePassword: string): Promise<boolean> {
        const isMatch = await BcryptUtil.compare(password, comparePassword);
        return isMatch;
    }
}