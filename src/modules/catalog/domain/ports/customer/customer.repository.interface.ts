import { CustomerEntity } from "../../entities";

export interface ICustomerRepository {
    create(customer: CustomerEntity): Promise<number>;
    update(customer: CustomerEntity): Promise<number>;
    getCustomers(active: number): Promise<CustomerEntity[]>;
    getCustomerById(id: number): Promise<CustomerEntity>;
    statusCustomer(id: number, status: number): Promise<number>;
    getCustomerByCode(code: string): Promise<CustomerEntity>;
}