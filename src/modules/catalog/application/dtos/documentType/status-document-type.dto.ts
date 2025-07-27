export class StatusDocumentTypeDto {

    constructor(
        public id: number,
        public active: boolean
    ) {}

    static async create(id: number, props: {[key: string]: boolean} = {}): Promise<[string?, StatusDocumentTypeDto?]> {
        if(!props) return ['Invalid request data'];
        const { active } = props;

        if(isNaN(id)) return ['id param has to be a number'];
        if(active !== true && active !== false) return ['active field is required and has to be a boolean'];

        return [
            undefined,
            new StatusDocumentTypeDto(
                id,
                active
            )
        ];
    }
}   