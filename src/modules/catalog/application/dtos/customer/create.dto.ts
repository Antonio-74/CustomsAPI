import { regularExps } from "../../../../../shared/config";
import { CustomerEntity } from "../../../domain/entities";

export class CreateDto {

    constructor(
        public name: string,
        public code: string,
        public email: string,
        public address: string
    ) {}

    static async create(props: {[key: string]: string} = {}): Promise<[string?, CreateDto?]> {
        if(!props) return ['Invalid request data'];
        const { name, code, email, address } = props;

        if(!name) return ['Customer name is required'];
        if(!code) return ['Customer code is required'];
        if(!email) return ['email is required'];
        if(!regularExps.email.test(email as string)) return ['email is not valid'];
        if(!address) return ['Customer address is required'];

        return [
            undefined, 
            new CreateDto(
                name,
                code,
                email,
                address
            )];
    }

    toEntity(): CustomerEntity {
        return new CustomerEntity(
            0,
            this.name,
            this.code,
            this.email,
            this.address,
            true
        );
    }
}