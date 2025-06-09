import { CustomerEntity } from "../../entities";

export interface IGetCustomersUseCase {
    execute(active: number): Promise<CustomerEntity[]>;
}