import { CountryEntity } from "../../entities";

export interface ICountryRepository {
    create(country: CountryEntity): Promise<number>;
    update(country: CountryEntity): Promise<number>;
    getCountries(active: boolean): Promise<CountryEntity[]>;
    getCountryById(id: number): Promise<CountryEntity>;
    statusCountry(id: number, active: boolean): Promise<number>;
}