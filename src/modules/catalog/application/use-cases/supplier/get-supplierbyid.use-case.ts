import { SupplierEntity } from "../../../domain/entities";
import { IGetSupplierByIdUseCase, ISupplierRepository } from "../../../domain/ports";

export class GetSupplierByIdUseCase implements IGetSupplierByIdUseCase {

    constructor(
        private readonly supplierRepository: ISupplierRepository
    ) {}

    execute(id: number): Promise<SupplierEntity> {
        return this.supplierRepository.getSupplierById(id);
    }
}