import { EmployeeEntity } from "../../entities";

export interface IEmployeeRepository {
    create(employee: EmployeeEntity): Promise<number>;
    update(employee: EmployeeEntity): Promise<number>;
    getEmployees(active: number): Promise<EmployeeEntity[]>;
    getEmployeeById(id: number): Promise<EmployeeEntity>;
    statusEmployee(id: number, active: number): Promise<number>;
}