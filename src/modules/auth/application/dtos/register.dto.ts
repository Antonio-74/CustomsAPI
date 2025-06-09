import { regularExps } from "../../../../shared/config";
import { UserEntity } from "../../domain/entities";

export class RegisterDto {

    constructor (
        public username: string,
        public password: string,
        public email: string,
        public role: string,
        public employeeId: number,
    ) {}

    static async create(props: {[key: string]: string | number} = {}): Promise<[string?, RegisterDto?]> {
        if(!props) return ['Invalid request data'];
        const { username, password, email, role, employeeId } = props;

        if(!username) return ['username is required'];
        if(!password) return ['password id required'];
        if(!email) return ['email is required'];
        if(!regularExps.email.test(email as string)) return ['email is not valid'];
        if(!role) return ['role is required'];
        if(role.toString() !== 'INS' && role.toString() !== 'ADMIN' && role.toString() !== 'OPE') return ['role is not valid'];
        if(!employeeId) return ['employeeId is required'];
        if(isNaN(employeeId as number)) return ['employeeId has to be number value'];

        return [
            undefined, 
            new RegisterDto(
                username as string, 
                password as string, 
                email as string, 
                role as string, 
                employeeId as number
            )];
    }

    toEntity(): UserEntity {
        return new UserEntity(
            0,
            this.username,
            this.password,
            this.email,
            this.role,
            this.employeeId,
            true
        );
    }
}