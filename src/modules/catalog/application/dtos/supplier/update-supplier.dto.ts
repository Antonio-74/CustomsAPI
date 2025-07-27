import { SupplierEntity } from "../../../domain/entities";

export class UpdateSupplierDto {

    constructor(
        public id: number,
        public name: string,
        public customerId: number,
        public active: boolean
    ) {}

    static async create(props: {[key: string]: string | number} = {}, id: number):Promise<[string?, UpdateSupplierDto?]> {
        if(!props) return ['Invalid request data'];
        const { name, customerId } = props

        if(isNaN(id)) return ['id param has to be a number'];
        if(!name) return ['name field is required'];
        if(!customerId) return ['customerId field is required'];
        if(isNaN(customerId as number)) return ['customerId field has to be a number'];
        
        return [
            undefined, 
            new UpdateSupplierDto(
                id,
                name as string, 
                customerId as number, 
                true
            )
        ];
    }

    toEntity(): SupplierEntity {
        return new SupplierEntity(
            this.id,
            this.name,
            this.customerId,
            this.active
        );
    }
}