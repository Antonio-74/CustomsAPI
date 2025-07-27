import { EmployeeEntity } from "../../entities";

export interface IUpdateEmployeeUseCase {
    execute(employee: EmployeeEntity): Promise<number>;
}