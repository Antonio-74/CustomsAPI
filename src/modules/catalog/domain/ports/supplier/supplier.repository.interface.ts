import { SupplierEntity } from "../../entities";

export interface ISupplierRepository {
    create(supplier: SupplierEntity): Promise<number>;
    update(supplier: SupplierEntity): Promise<number>;
    getSuppliers(customerId: number, active: number): Promise<SupplierEntity[]>;
    getSupplierById(id: number): Promise<SupplierEntity>;
    statusSupplier(id: number, active: number): Promise<number>;
}