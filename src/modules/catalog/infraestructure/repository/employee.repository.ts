import { MySqlUtil } from "../../../../shared/utils";
import { EmployeeEntity } from "../../domain/entities";
import { IEmployeeRepository } from "../../domain/ports";

export class EmployeeRepository implements IEmployeeRepository {
    
    async create(employee: EmployeeEntity): Promise<number> {
        const { name, lastname, departmentId, active } = employee;

        const employeeSaved = await MySqlUtil.insert('employees', {
            name,
            lastname,
            departmentId,
            active
        });

        return employeeSaved;
    }

    async update(employee: EmployeeEntity): Promise<number> {
        const { id, name, lastname, departmentId } = employee;

        const employeeUpdated = await MySqlUtil.update(
            'employees',
            { name, lastname, departmentId },
            { id }
        );

        return employeeUpdated;
    }

    async getEmployees(active: number): Promise<EmployeeEntity[]> {
        const employees = await MySqlUtil.callProcedure<EmployeeEntity>('get_employees', [active]);

        return employees;
    }

    async getEmployeeById(id: number): Promise<EmployeeEntity> {
        const employee = await MySqlUtil.findOne<EmployeeEntity>(
            'SELECT id, name, lastname, departmentId, active FROM employees WHERE id = ?',
            [id]
        );

        return employee;
    }

    async statusEmployee(id: number, active: number): Promise<number> {
        const statusUpdated = await MySqlUtil.update(
            'employees',
            { active: active },
            { id }
        );

        return statusUpdated;
    }

}