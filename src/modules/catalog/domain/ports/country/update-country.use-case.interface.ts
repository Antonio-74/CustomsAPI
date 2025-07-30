import { CountryEntity } from "../../entities";

export interface IUpdateCountryUseCase {
    execute(country: CountryEntity): Promise<number>;
}