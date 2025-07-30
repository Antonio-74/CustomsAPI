import { MeasurementUnitEntity } from "../../../domain/entities";
import { IUpdateMeasurementUnitUseCase } from "../../../domain/ports";
import { MeasurementUnitRepository } from "../../../infraestructure";

export class UpdateMeasurementUnitUseCase implements IUpdateMeasurementUnitUseCase {
    constructor(
        private readonly measurementUnitRepository: MeasurementUnitRepository
    ) {}

    async execute(measurementUnit: MeasurementUnitEntity): Promise<number> {
        return this.measurementUnitRepository.update(measurementUnit);
    }
}