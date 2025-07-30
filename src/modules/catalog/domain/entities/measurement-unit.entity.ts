export class MeasurementUnitEntity {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly code: string,
        public readonly active: boolean,
    ){}
}