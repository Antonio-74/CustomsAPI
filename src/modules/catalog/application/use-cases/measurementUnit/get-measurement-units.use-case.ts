import { MeasurementUnitEntity } from "../../../domain/entities";
import { IGetMeasurementUnitsUseCase } from "../../../domain/ports";
import { MeasurementUnitRepository } from "../../../infraestructure";

export class GetMeasurementUnitsUseCase implements IGetMeasurementUnitsUseCase {
    constructor(
        private readonly measurementUnitRepository: MeasurementUnitRepository
    ) {}

    async execute(active: boolean): Promise<MeasurementUnitEntity[]> {
        return this.measurementUnitRepository.getMeasurementUnits(active);
    }
}