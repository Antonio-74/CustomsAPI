import { IStatusCountryUseCase } from "../../../domain/ports";
import { CountryRepository } from "../../../infraestructure";

export class StatusCountryUseCase implements IStatusCountryUseCase {
    constructor(
        private readonly countryRepository: CountryRepository,
    ) {}

    execute(id: number, active: boolean): Promise<number> {
        return this.countryRepository.statusCountry(id, active);
    }
}