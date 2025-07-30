
export class StatusCountryDto {
    constructor (
        public id: number,
        public active: boolean,
    ){}

    static async create(id: number, props: {[key: string]: boolean} = {}): Promise<[string?, StatusCountryDto?]> {
        if(!props) return ['Invalid request data'];
        const { active } = props;

        if(isNaN(id)) return ['id param has to be a number'];
        if(typeof active !== 'boolean') return ['active field has to be a boolean'];

        return [
            undefined,
            new StatusCountryDto(
                id,
                active
            )
        ];
    }
}