import { CustomerEntity } from "../../entities";

export interface IGetCustomerByCodeUseCase {
    execute(code: string): Promise<CustomerEntity>;
}