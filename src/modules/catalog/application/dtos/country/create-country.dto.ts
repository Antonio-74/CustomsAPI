import { CountryEntity } from "../../../domain/entities";

export class CreateCountryDto {
    constructor(
        public readonly name: string,
        public readonly code: string,
        public readonly active: boolean,
    ){}

    static async create(props: {[key: string]: string | number} = {}): Promise<[string?, CreateCountryDto?]> {
        if(!props) return ['Invalid request data'];
        const { name, code } = props;

        if(!name) return ['name field is required'];
        if(!code) return ['code field is required'];
        if(code.toString().length !== 3) return ['code field has to be 3 characters'];

        return [
            undefined,
            new CreateCountryDto(
                name as string,
                code as string,
                true
            )
        ];
    }

    toEntity(): CountryEntity {
        return new CountryEntity(
            0,
            this.name,
            this.code,
            this.active
        );
    }
}