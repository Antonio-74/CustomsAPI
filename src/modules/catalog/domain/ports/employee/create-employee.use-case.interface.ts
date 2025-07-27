import { EmployeeEntity } from "../../entities";

export interface ICreateEmployeeUseCase {
    execute(employee: EmployeeEntity): Promise<number>;
}