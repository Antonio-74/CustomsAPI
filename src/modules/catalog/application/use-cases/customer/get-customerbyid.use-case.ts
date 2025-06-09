import { CustomerEntity } from "../../../domain/entities";
import { ICustomerRepository, IGetCustomerByIdUseCase } from "../../../domain/ports";

export class GetCustomerByIdUseCase implements IGetCustomerByIdUseCase {

    constructor(
        private readonly customerRepository: ICustomerRepository
    ) {}

    execute(id: number): Promise<CustomerEntity> {
        return this.customerRepository.getCustomerById(id);
    }
}