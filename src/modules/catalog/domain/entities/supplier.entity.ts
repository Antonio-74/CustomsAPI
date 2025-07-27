
export class SupplierEntity {

    constructor(
        public id: number,
        public name: string,
        public customerId: number,
        public active: boolean
    ) {}
}