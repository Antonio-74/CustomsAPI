import { CustomerEntity } from '../../../domain/entities';
import { ICustomerRepository } from '../../../domain/ports';
import { IGetCustomersUseCase } from '../../../domain/ports/customer/get-customers.use-case.interface';

export class GetCustomersUseCase implements IGetCustomersUseCase {

    constructor(
        private readonly customerRepository: ICustomerRepository
    ) {}

    execute(active: number): Promise<CustomerEntity[]> {
        return this.customerRepository.getCustomers(active);
    }
}