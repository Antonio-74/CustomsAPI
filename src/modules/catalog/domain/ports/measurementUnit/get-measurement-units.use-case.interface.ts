import { MeasurementUnitEntity } from "../../entities";

export interface IGetMeasurementUnitsUseCase {
    execute(active: boolean): Promise<MeasurementUnitEntity[]>;
}