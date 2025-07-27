import { SupplierEntity } from "../../entities";

export interface IGetSupplierByIdUseCase {
    execute(id: number): Promise<SupplierEntity>;
}