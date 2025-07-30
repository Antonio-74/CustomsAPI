export class GetMeasurementUnitsDto {
    constructor(
        public active: boolean
    ) {}

    static async create(active: number): Promise<[string?, GetMeasurementUnitsDto?]> {

        if(isNaN(active)) return ['active param is not a number'];
        if(active !== 0 && active !== 1) return ['active param has to be 0 or 1'];

        return [
            undefined,
            new GetMeasurementUnitsDto(
                active === 1 ? true : false
            )
        ];
    }
}