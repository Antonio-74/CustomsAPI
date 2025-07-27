import { EmployeeEntity } from "../../entities";

export interface IGetEmployeeByIdUseCase {
    execute(id: number): Promise<EmployeeEntity>;
}