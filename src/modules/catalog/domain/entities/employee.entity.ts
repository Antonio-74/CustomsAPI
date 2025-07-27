
export class EmployeeEntity {

    constructor(
        public id: number,
        public name: string,
        public lastname: string,
        public departmentId: number,
        public active: boolean
    ) {}
}