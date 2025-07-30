import { CountryEntity } from "../../entities";

export interface IGetCountriesUseCase {
    execute(active: boolean): Promise<CountryEntity[]>;
}