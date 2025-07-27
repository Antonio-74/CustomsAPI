import { IStatusSupplierUseCase, ISupplierRepository } from "../../../domain/ports";

export class StatusSupplierUseCase implements IStatusSupplierUseCase {

     constructor(
        private readonly supplierRepository: ISupplierRepository
     ) {}

    execute(id: number, active: number): Promise<number> {
        return this.supplierRepository.statusSupplier(id, active);
    }
}