import { MeasurementUnitEntity } from "../../../domain/entities";

export class CreateMeasurementUnitDto {
    constructor(
        public name: string,
        public code : string,
        public active: boolean
    ) {}

    static async create(props: {[key: string]: string | number } = {}): Promise<[string?, CreateMeasurementUnitDto?]> {
        if(!props) return ['Invalid request data'];
        const { name, code  } = props;

        if(!name) return ['name field is required'];
        if(!code) return ['code field is required'];

        return [
            undefined,
            new CreateMeasurementUnitDto(
                name as string,
                code as string,
                true
            )
        ];
    }

    toEntity(): MeasurementUnitEntity {
        return new MeasurementUnitEntity(
            0,
            this.name,
            this.code,
            this.active
        );
    }
}