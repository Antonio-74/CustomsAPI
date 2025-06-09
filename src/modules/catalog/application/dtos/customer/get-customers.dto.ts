
export class GetCustomersDto {

    constructor(
        public active: number
    ) {}

    static async create(active: number): Promise<[string?, GetCustomersDto?]> {

        if(isNaN(active)) return ['active param has to be a number'];
        if(active !== 0 && active !== 1) return ['active para has to be 0 or 1 number'];

        return [
            undefined, 
            new GetCustomersDto(
                active
            )];
    }
}