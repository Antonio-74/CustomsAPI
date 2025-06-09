import { MySqlUtil } from "../../../../shared/utils";
import { CustomerEntity } from "../../domain/entities";
import { ICustomerRepository } from "../../domain/ports";

export class CustomerRepository implements ICustomerRepository {
    
    async create(customer: CustomerEntity): Promise<number> {
        const { name, code, email, address, active } = customer;

        const customerSavedId = await MySqlUtil.insert('customers', {
            name,
            code,
            email,
            address,
            active
        });

        return customerSavedId;
    }

    async update(customer: CustomerEntity): Promise<number> {
        const { id, name, code, email, address } = customer;
        const customerUpdate = await MySqlUtil.update(
            'customers',
            { name, code, email, address },
            { id }
        );

        return customerUpdate;
    }

    async getCustomers(active: number): Promise<CustomerEntity[]> {
        const customers = await MySqlUtil.find<CustomerEntity>(
            'SELECT id, name, code, email, address, active FROM customers WHERE active = ?',
            [active]
        );

        return customers;
    }

    async getCustomerById(id: number): Promise<CustomerEntity> {
        const customer = await MySqlUtil.findOne<CustomerEntity>(
            'SELECT id, name, code, email, address, active FROM customers WHERE id = ?',
            [id]
        );

        return customer;
    }

    async statusCustomer(id: number, status: number): Promise<number> {
        const statusUpdated = await MySqlUtil.update(
            'customers',
            { active: status },
            { id }
        );

        return statusUpdated;
    }

    async getCustomerByCode(code: string): Promise<CustomerEntity> {
        const customer = await MySqlUtil.findOne<CustomerEntity>(
            'SELECT code FROM customers WHERE code = ?',
            [code]
        );

        return customer;
    }
}