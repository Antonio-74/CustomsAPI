import { CountryEntity } from "../../entities";

export interface ICreateCountryUseCase {
    execute(country: CountryEntity): Promise<number>;
}