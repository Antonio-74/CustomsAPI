import { MeasurementUnitEntity } from "../../entities";

export interface IMeasurementUnitRepository {
    create(measurementUnit: MeasurementUnitEntity): Promise<number>;
    update(measurementUnit: MeasurementUnitEntity): Promise<number>;
    getMeasurementUnits(active: boolean): Promise<MeasurementUnitEntity[]>;
    getMeasurementUnitById(id: number): Promise<MeasurementUnitEntity>;
    statusMeasurementUnit(id: number, active: boolean): Promise<number>;
}