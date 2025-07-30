import { MeasurementUnitEntity } from "../../../domain/entities";
import { IGetMeasurementUnitByIdUseCase } from "../../../domain/ports";
import { MeasurementUnitRepository } from "../../../infraestructure";

export class GetMeasurementUnitByIdUseCase implements IGetMeasurementUnitByIdUseCase {
    constructor(
        private readonly measurementUnitRepository: MeasurementUnitRepository
    ) {}

    async execute(id: number): Promise<MeasurementUnitEntity> {
        return this.measurementUnitRepository.getMeasurementUnitById(id);
    }
}