import { SupplierEntity } from "../../../domain/entities";
import { IGetSuppliersUseCase, ISupplierRepository } from "../../../domain/ports";

export class GetSuppliersUseCase implements IGetSuppliersUseCase {

    constructor(
        private readonly supplierRepository: ISupplierRepository
    ) {}

    execute(customerId: number, active: number): Promise<SupplierEntity[]> {
        return this.supplierRepository.getSuppliers(customerId, active);
    }
}