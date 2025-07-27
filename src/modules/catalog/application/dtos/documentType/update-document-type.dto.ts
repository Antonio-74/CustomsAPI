import { DocumentTypeEntity } from "../../../domain/entities";

export class UpdateDocumentTypeDto {

    constructor(
        public id: number,
        public name: string,
        public code: string,
        public active: boolean
    ) {}

    static async create(id: number, props: {[key: string]: string | number | boolean} = {}): Promise<[string?, UpdateDocumentTypeDto?]> {
        if(!props) return ['Invalid request data'];
        const { code, name, active } = props;

        if(isNaN(id)) return ['id param has to be a number'];
        if(!name) return ['name field is required'];
        if(!code) return ['code field is required'];
        if(code.toString().length !== 2) return ['code field has to be 2 characters'];     
        if(!active) return ['active field is required'];
        if(active as boolean !== true && active as boolean !== false) return ['active field has to be a boolean'];

        return [
            undefined,
            new UpdateDocumentTypeDto(
                id as number,
                name as string,
                code as string,
                active as boolean
            )
        ];
    }

    toEntity(): DocumentTypeEntity {
        return new DocumentTypeEntity(
            this.id,
            this.name,
            this.code,
            this.active
        );
    }
}   