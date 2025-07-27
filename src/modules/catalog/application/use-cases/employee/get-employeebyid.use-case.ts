import { EmployeeEntity } from "../../../domain/entities";
import { IGetEmployeeByIdUseCase } from "../../../domain/ports";
import { EmployeeRepository } from "../../../infraestructure/repository/employee.repository";

export class GetEmployeeByIdUseCase implements IGetEmployeeByIdUseCase {

    constructor (
        private readonly employeeRepository: EmployeeRepository
    ) {}

    execute(id: number): Promise<EmployeeEntity> {
        return this.employeeRepository.getEmployeeById(id);
    }
}