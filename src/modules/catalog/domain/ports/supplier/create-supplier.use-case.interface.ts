import { SupplierEntity } from "../../entities";

export interface ICreateSupplierUseCase {
    execute(supplier: SupplierEntity): Promise<number>;
}