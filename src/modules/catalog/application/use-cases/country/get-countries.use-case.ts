import { CountryEntity } from "../../../domain/entities";
import { IGetCountriesUseCase } from "../../../domain/ports";
import { CountryRepository } from "../../../infraestructure";

export class GetCountriesUseCase implements IGetCountriesUseCase {
    constructor(
        private readonly countryRepository: CountryRepository,
    ) {}

    execute(active: boolean): Promise<CountryEntity[]> {
        return this.countryRepository.getCountries(active);
    }
}