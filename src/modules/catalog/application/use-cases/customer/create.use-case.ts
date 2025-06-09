import { CustomerEntity } from "../../../domain/entities";
import { ICreateUseCase, ICustomerRepository } from "../../../domain/ports";

export class CreateUseCase implements ICreateUseCase {
    
    constructor (
        private readonly customerRepository: ICustomerRepository
    ) {}

    execute(customer: CustomerEntity): Promise<number> {
        return this.customerRepository.create(customer);
    }
}