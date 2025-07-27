import { SupplierEntity } from "../../../domain/entities";
import { ICreateSupplierUseCase, ISupplierRepository } from "../../../domain/ports";

export class CreateSupplierUseCase implements ICreateSupplierUseCase {

    constructor(
        private readonly supplierRepository: ISupplierRepository
    ) {}

    execute(supplier: SupplierEntity): Promise<number> {
        return this.supplierRepository.create(supplier);
    }
}