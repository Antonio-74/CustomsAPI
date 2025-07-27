import { DocumentTypeEntity } from "../../../domain/entities";

export class CreateDocumentTypeDto {

    constructor(
        public name: string,
        public code: string,
        public active: boolean
    ) {}

    static async create(props: {[key: string]: string | number} = {}): Promise<[string?, CreateDocumentTypeDto?]> {
        if(!props) return ['Invalid request data'];
        const { code, name } = props;

        if(!name) return ['name field is required'];
        if(!code) return ['code field is required'];
        if(code.toString().length !== 2) return ['code field has to be 2 characters'];

        return [
            undefined,
            new CreateDocumentTypeDto(
                name as string,
                code as string,
                true
            )
        ];
    }

    toEntity(): DocumentTypeEntity {
        return new DocumentTypeEntity(
            0,
            this.name,
            this.code,
            this.active
        );
    }
}   