import { EmployeeEntity } from "../../../domain/entities";
import { IEmployeeRepository, IGetEmployeesUseCase } from "../../../domain/ports";

export class GetEmployeeUseCase implements IGetEmployeesUseCase {

    constructor (
        private readonly employeeRepository: IEmployeeRepository
    ) {}

    execute(active: number): Promise<EmployeeEntity[]> {
        return this.employeeRepository.getEmployees(active);
    }
}