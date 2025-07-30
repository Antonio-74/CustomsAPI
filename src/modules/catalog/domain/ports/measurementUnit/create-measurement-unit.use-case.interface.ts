import { MeasurementUnitEntity } from "../../entities";

export interface ICreateMeasurementUnitUseCase {
    execute(measurementUnit: MeasurementUnitEntity): Promise<number>;
}