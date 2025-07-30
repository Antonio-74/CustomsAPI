import { CountryEntity } from "../../../domain/entities";
import { IGetCountryByIdUseCase } from "../../../domain/ports";
import { CountryRepository } from "../../../infraestructure";

export class GetCountryByIdUseCase implements IGetCountryByIdUseCase {
    constructor(
        private readonly countryRepository: CountryRepository,
    ) {}

    execute(id: number): Promise<CountryEntity> {
        return this.countryRepository.getCountryById(id);
    }
}