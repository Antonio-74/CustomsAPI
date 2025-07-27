
export interface IStatusSupplierUseCase {
    execute(id: number, active: number):Promise<number>;
}