
export interface IStatusCustomerUseCase {
    execute(id: number, active: number): Promise<number>;
}