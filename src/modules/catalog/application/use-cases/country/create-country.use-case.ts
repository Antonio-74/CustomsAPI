import { ICreateCountryUseCase } from "../../../domain/ports";
import { CountryRepository } from "../../../infraestructure";
import { CountryEntity } from "../../../domain/entities";

export class CreateCountryUseCase implements ICreateCountryUseCase {
    constructor(
        private readonly countryRepository: CountryRepository
    ) {}

    async execute(country: CountryEntity): Promise<number> {
        return this.countryRepository.create(country);
    }
}