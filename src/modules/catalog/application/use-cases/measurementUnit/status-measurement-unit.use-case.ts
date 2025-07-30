import { IStatusMeasurementUnitUseCase } from "../../../domain/ports";
import { MeasurementUnitRepository } from "../../../infraestructure";

export class StatusMeasurementUnitUseCase implements IStatusMeasurementUnitUseCase {
    constructor(
        private readonly measurementUnitRepository: MeasurementUnitRepository
    ) {}

    async execute(id: number, active: boolean): Promise<number> {
        return this.measurementUnitRepository.statusMeasurementUnit(id, active);
    }
}