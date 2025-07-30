import { CountryEntity } from "../../../domain/entities";
import { IUpdateCountryUseCase } from "../../../domain/ports";
import { CountryRepository } from "../../../infraestructure";

export class UpdateCountryUseCase implements IUpdateCountryUseCase {
    constructor(
        private readonly countryRepository: CountryRepository,
    ) {}

    execute(country: CountryEntity): Promise<number> {
        return this.countryRepository.update(country);
    }
}