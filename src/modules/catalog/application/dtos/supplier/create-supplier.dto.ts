import { SupplierEntity } from "../../../domain/entities";

export class CreateSupplierDto {

    constructor(
        public name: string,
        public customerId: number,
        public active: boolean
    ) {}

    static async create(props: {[key: string]: string | number} = {}):Promise<[string?, CreateSupplierDto?]> {
        if(!props) return ['Invalid request data'];
        const { name, customerId } = props

        if(!name) return ['name field is required'];
        if(!customerId) return ['customerId field is required'];
        if(isNaN(customerId as number)) return ['customerId field has to be a number'];
        
        return [
            undefined, 
            new CreateSupplierDto(
                name as string, 
                customerId as number, 
                true
            )
        ];
    }

    toEntity(): SupplierEntity {
        return new SupplierEntity(
            0,
            this.name,
            this.customerId,
            this.active
        );
    }
}