import { EmployeeEntity } from "../../../domain/entities";

export class UpdateEmployeeDto {

    constructor (
        public name: string,
        public lastname: string,
        public departmentId: number,
        public active: boolean
    ) {}

    static async create(props: {[key: string]: string | number} = {}, id: number): Promise<[string?, UpdateEmployeeDto?]> {
        if(!props) return ['Invalid request data'];
        const { name, lastname, departmentId } = props;

        if(isNaN(id)) return ['id param has to be a number'];
        if(!name) return ['name field is required'];
        if(!lastname) return ['lastname field is required'];
        if(isNaN(departmentId as number)) return ['departmentId field has to be a number'];

        return [
            undefined,
            new UpdateEmployeeDto(
                name as string,
                lastname as string,
                departmentId as number,
                true
            )
        ];
    }

    toEntity(): EmployeeEntity {
        return new EmployeeEntity(
            0,
            this.name,
            this.lastname,
            this.departmentId,
            this.active
        );
    }
}