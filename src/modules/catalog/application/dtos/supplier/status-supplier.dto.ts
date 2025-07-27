export class StatusSupplierDto {

    constructor(
        public id: number,
        public active: number
    ) {}

    static async create(id: number, props: {[key: string]: number} = {}):Promise<[string?, StatusSupplierDto?]> {
        if(!props) return ['Invalid request data'];
        const { active } = props;

        if(isNaN(id)) return ['id param has to be a number'];
        if(isNaN(active)) return ['active field has to be a number'];
        if(active !== 0 && active !== 1) return ['active field has to be 0 or 1'];
        
        return [
            undefined, 
            new StatusSupplierDto(
                id,
                active
            )
        ];
    }
}