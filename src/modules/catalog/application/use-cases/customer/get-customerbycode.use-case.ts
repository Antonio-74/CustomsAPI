import { CustomerEntity } from "../../../domain/entities";
import { ICustomerRepository, IGetCustomerByCodeUseCase } from "../../../domain/ports";

export class GetCustomerByCodeUseCase implements IGetCustomerByCodeUseCase {

    constructor(
        private readonly customerRepository: ICustomerRepository
    ) {}

    execute(code: string): Promise<CustomerEntity> {
        return this.customerRepository.getCustomerByCode(code);
    }
}