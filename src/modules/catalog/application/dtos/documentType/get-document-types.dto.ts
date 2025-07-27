export class GetDocumentTypesDto {

    constructor(
        public active: number
    ) {}

    static async create(active: number): Promise<[string?, GetDocumentTypesDto?]> {
        if(isNaN(active as number)) return ['active param has to be a number'];
        if(active !== 0 && active !== 1) return ['active param has to be 0 or 1'];

        return [
            undefined,
            new GetDocumentTypesDto(
                active
            )
        ];
    }   
}