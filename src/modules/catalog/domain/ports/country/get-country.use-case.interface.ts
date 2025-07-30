import { CountryEntity } from "../../entities";

export interface IGetCountryByIdUseCase {
    execute(id: number): Promise<CountryEntity>;
}