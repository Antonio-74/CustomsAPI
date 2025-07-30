
export class GetCountriesDto {
    constructor(
        public active: number,
    ) {}

    static async create(active: number): Promise<[string?, GetCountriesDto?]> {

        if(isNaN(active)) return ['active param has to be a number'];
        if(active !== 1 && active !== 0) return ['active param has to be 1 or 0'];

        return [
            undefined,
            new GetCountriesDto(
                active
            )
        ];
    }
}