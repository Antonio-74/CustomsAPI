import { EmployeeEntity } from "../../entities";

export interface IGetEmployeesUseCase {
    execute(active: number): Promise<EmployeeEntity[]>;
}