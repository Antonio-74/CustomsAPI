import { SupplierEntity } from "../../entities";

export interface IGetSuppliersUseCase {
    execute(customerId: number, active: number): Promise<SupplierEntity[]>;
}