import { MeasurementUnitEntity } from "../../entities";

export interface IGetMeasurementUnitByIdUseCase {
    execute(id: number): Promise<MeasurementUnitEntity>;
}   