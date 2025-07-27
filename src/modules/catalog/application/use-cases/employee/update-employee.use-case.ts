import { EmployeeEntity } from "../../../domain/entities";
import { IEmployeeRepository, IUpdateEmployeeUseCase } from "../../../domain/ports";

export class UpdateEmployeeUseCase implements IUpdateEmployeeUseCase {
    constructor (
        private readonly employeeRepository: IEmployeeRepository
    ) {}

    execute(employee: EmployeeEntity): Promise<number> {
        return this.employeeRepository.update(employee);
    }
}