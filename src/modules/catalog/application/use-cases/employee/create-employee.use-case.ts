import { EmployeeEntity } from "../../../domain/entities";
import { ICreateEmployeeUseCase, IEmployeeRepository } from "../../../domain/ports";

export class CreateEmployeeUseCase implements ICreateEmployeeUseCase {

    constructor (
        private readonly employeeRepository: IEmployeeRepository
    ) {}

    execute(employee: EmployeeEntity): Promise<number> {
        return this.employeeRepository.create(employee);
    }

}