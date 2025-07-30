import { MeasurementUnitEntity } from "../../../domain/entities";
import { ICreateMeasurementUnitUseCase } from "../../../domain/ports";
import { MeasurementUnitRepository } from "../../../infraestructure";


export class CreateMeasurementUnitUseCase implements ICreateMeasurementUnitUseCase {
    constructor(
        private readonly measurementUnitRepository: MeasurementUnitRepository
    ) {}

    async execute(measurementUnit: MeasurementUnitEntity): Promise<number> {
        return this.measurementUnitRepository.create(measurementUnit);
    }
}