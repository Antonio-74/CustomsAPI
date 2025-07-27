import { SupplierEntity } from "../../../domain/entities";
import { ISupplierRepository, IUpdateSupplierUseCase } from "../../../domain/ports";

export class UpdateSupplierUseCase implements IUpdateSupplierUseCase {
    
    constructor(
        private readonly supplierRepository: ISupplierRepository
    ) {}

    execute(supplier: SupplierEntity): Promise<number> {
        return this.supplierRepository.update(supplier);
    }
}