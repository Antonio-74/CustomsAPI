
export class UserEntity {

    constructor (
        public id: number,
        public username: string,
        public password: string,
        public email: string,
        public role: string,
        public employeeId: number,
        public active: boolean
    ) {}
}