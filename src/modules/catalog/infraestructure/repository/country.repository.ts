import { ICountryRepository } from "../../domain/ports";
import { CountryEntity } from "../../domain/entities";
import { MySqlUtil } from "../../../../shared/utils";

export class CountryRepository implements ICountryRepository {
    async create(country: CountryEntity): Promise<number> {
        const { name, code, active } = country;

        const countrySaved = await MySqlUtil.insert('countries', {
            name,
            code,
            active: active ? 1 : 0
        });

        return countrySaved;
    }

    async update(country: CountryEntity): Promise<number> {
        const { id, name, code } = country;

        const countryUpdated = await MySqlUtil.update('countries', {
            name,
            code
        }, { id });

        return countryUpdated;
    }

    async getCountries(active: boolean): Promise<CountryEntity[]> {
        const countries = await MySqlUtil.find<CountryEntity>(
            'SELECT id, name, code, active FROM countries WHERE active = ?',
            [active]
        );

        return countries;
    }

    async getCountryById(id: number): Promise<CountryEntity> {
        const country = await MySqlUtil.findOne<CountryEntity>(
            'SELECT id, name, code, active FROM countries WHERE id = ?',
            [id]
        );

        return country;
    }

    async statusCountry(id: number, active: boolean): Promise<number> {
        const countryStatusUpdated = await MySqlUtil.update('countries', {
            active: active ? 1 : 0
        }, { id });

        return countryStatusUpdated;
    }
}