import { CountryEntity } from "../../../domain/entities";

export class UpdateCountryDto {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly code: string,
        public readonly active: boolean,
    ){}

    static async create(id: number, props: {[key: string]: string | number | boolean} = {}): Promise<[string?, UpdateCountryDto?]> {
        if(!props) return ['Invalid request data'];
        const { name, code, active } = props;

        if(isNaN(id)) return ['id param has to be a number'];
        if(!name) return ['name field is required'];
        if(!code) return ['code field is required'];
        if(code.toString().length !== 3) return ['code field has to be 3 characters'];
        if(typeof active !== 'boolean') return ['active field has to be a boolean'];

        return [
            undefined,
            new UpdateCountryDto(
                id,
                name as string,
                code as string,
                active as boolean
            )
        ];
    }

    toEntity(): CountryEntity {
        return new CountryEntity(
            this.id,
            this.name,
            this.code,
            this.active
        );
    }
}