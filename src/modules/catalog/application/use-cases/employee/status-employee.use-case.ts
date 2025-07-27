import { IEmployeeRepository, IStatusEmployeeUseCase } from "../../../domain/ports";

export class StatusEmployeeUseCase implements IStatusEmployeeUseCase {

    constructor (
        private readonly employeeRepository: IEmployeeRepository
    ) {}

    execute(id: number, active: number): Promise<number> {
        return this.employeeRepository.statusEmployee(id, active);
    }
}