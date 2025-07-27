export class GetEmployeesDto {

    constructor (
        public active: number
    ) {}

    static async create(active: number): Promise<[string?, GetEmployeesDto?]> {
        if(isNaN(active)) return ['active field has to be a number'];
        if(active !== 0 && active !== 1) return ['active field has to be 0 or 1'];

        return [
            undefined,
            new GetEmployeesDto(
                active
            )
        ];
    }
}