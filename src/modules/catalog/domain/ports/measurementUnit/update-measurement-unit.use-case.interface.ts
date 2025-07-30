import { MeasurementUnitEntity } from "../../entities";

export interface IUpdateMeasurementUnitUseCase {
    execute(measurementUnit: MeasurementUnitEntity): Promise<number>;
}