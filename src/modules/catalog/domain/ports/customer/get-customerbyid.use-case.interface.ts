import { CustomerEntity } from "../../entities";

export interface IGetCustomerByIdUseCase {
    execute(id: number): Promise<CustomerEntity>;
}