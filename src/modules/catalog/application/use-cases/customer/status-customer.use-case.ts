import { ICustomerRepository, IStatusCustomerUseCase } from "../../../domain/ports";

export class StatusCustomerUseCase implements IStatusCustomerUseCase {

    constructor(
        private readonly customerRepository: ICustomerRepository
    ) {}

    execute(id: number, active: number): Promise<number> {
        return this.customerRepository.statusCustomer(id, active); 
    }
}