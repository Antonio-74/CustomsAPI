import { CustomerEntity } from "../../../domain/entities";
import { ICustomerRepository, IUpdateUseCase } from "../../../domain/ports";

export class UpdateUseCase implements IUpdateUseCase {

    constructor(
        private readonly customerRepository: ICustomerRepository
    ) {}

    execute(customer: CustomerEntity): Promise<number> {
        return this.customerRepository.update(customer);
    }
}