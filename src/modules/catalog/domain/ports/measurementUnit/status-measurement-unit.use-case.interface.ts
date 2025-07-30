export interface IStatusMeasurementUnitUseCase {
    execute(id: number, active: boolean): Promise<number>;
}