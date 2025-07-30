import { MySqlUtil } from "../../../../shared/utils";
import { MeasurementUnitEntity } from "../../domain/entities";
import { IMeasurementUnitRepository } from "../../domain/ports";

export class MeasurementUnitRepository implements IMeasurementUnitRepository {
    async create(measurementUnitEntity: MeasurementUnitEntity): Promise<number> {
        const { name, code, active } = measurementUnitEntity;

        const measurementUnitSaved = await MySqlUtil.insert('measurement_units', { 
            name, 
            code, 
            active 
        });

        return measurementUnitSaved;
    }

    async update(measurementUnitEntity: MeasurementUnitEntity): Promise<number> {
        const { id, name, code } = measurementUnitEntity;

        const measurementUnitUpdated = await MySqlUtil.update('measurement_units', { 
            name, 
            code 
        }, { id });

        return measurementUnitUpdated;
    }

    async getMeasurementUnits(active: boolean): Promise<MeasurementUnitEntity[]> {
        const measurementUnits = await MySqlUtil.find<MeasurementUnitEntity>(
            'SELECT id, name, code, active FROM measurement_units WHERE active = ?', 
            [active]
        );

        return measurementUnits;
    }

    async getMeasurementUnitById(id: number): Promise<MeasurementUnitEntity> {
        const measurementUnit = await MySqlUtil.findOne<MeasurementUnitEntity>(
            'SELECT id, name, code, active FROM measurement_units WHERE id = ?',
            [id]
        );

        return measurementUnit;
    }

    async statusMeasurementUnit(id: number, active: boolean): Promise<number> {
        const measurementUnitStatusUpdated = await MySqlUtil.update('measurement_units', { active }, { id });

        return measurementUnitStatusUpdated;
    }
}