import { SupplierEntity } from "../../entities";

export interface IUpdateSupplierUseCase {
    execute(supplier: SupplierEntity): Promise<number>;
}