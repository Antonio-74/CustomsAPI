import { MeasurementUnitEntity } from "../../../domain/entities";

export class UpdateMeasurementUnitDto {
    constructor(
        public id: number,
        public name: string,
        public code: string,
        public active: boolean
    ) {}

    static async create(id: number, props: {[key: string]: string | number | boolean} = {}): Promise<[string?, UpdateMeasurementUnitDto?]> {
        if(!props) return ['Invalid request data'];
        const { name, code, active } = props;

        if(isNaN(id)) return ['id param is not a number'];
        if(!name) return ['name field is required'];
        if(!code) return ['code field is required'];
        if(typeof active !== 'boolean') return ['active field has to be a boolean'];

        return [
            undefined,
            new UpdateMeasurementUnitDto(
                id as number,
                name as string,
                code as string,
                active as boolean
            )
        ];
    }

    toEntity(): MeasurementUnitEntity {
        return new MeasurementUnitEntity(
            this.id,
            this.name,
            this.code,
            this.active
        );
    }
}