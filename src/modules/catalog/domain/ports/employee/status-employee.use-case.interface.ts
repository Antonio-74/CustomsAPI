
export interface IStatusEmployeeUseCase {
    execute(id: number, active: number): Promise<number>;
}