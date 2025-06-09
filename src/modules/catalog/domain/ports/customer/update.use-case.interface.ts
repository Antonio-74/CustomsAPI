import { CustomerEntity } from "../../entities";

export interface IUpdateUseCase {
    execute(customer: CustomerEntity): Promise<number>;
}