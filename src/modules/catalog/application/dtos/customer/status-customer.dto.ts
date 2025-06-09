
export class StatusCustomerDto {

    constructor(
        public id: number,
        public active: number 
    ) {}

    static async create(props: {[key: string]: number} = {}, id: number): Promise<[string?, StatusCustomerDto?]> {
        if(!props) return ['Invalid request data'];
        const { active } = props;

        if(isNaN(id)) return ['id has to be a number'];
        if(isNaN(active)) return ['active field has to be a number'];
        if(active !== 0 && active !== 1) return ['active field has to be a 0 or 1'];

        return [
            undefined, 
            new StatusCustomerDto(
                id,
                active
            )];
    }
}