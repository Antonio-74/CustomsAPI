import { CustomerEntity } from "../../entities";

export interface ICreateUseCase {
    execute(customer: CustomerEntity): Promise<number>;
}