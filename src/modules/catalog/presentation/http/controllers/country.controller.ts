import { Request, Response } from "express";
import { CreateCountryUseCase, UpdateCountryUseCase, GetCountriesUseCase, GetCountryByIdUseCase, StatusCountryUseCase } from "../../../application/use-cases";
import { CreateCountryDto, GetCountriesDto, StatusCountryDto, UpdateCountryDto } from "../../../application/dtos";
import { ResponseUtil } from "../../../../../shared/utils";

export class CountryController {

    constructor(
        private readonly createCountryUseCase: CreateCountryUseCase,
        private readonly updateCountryUseCase: UpdateCountryUseCase,
        private readonly getCountriesUseCase: GetCountriesUseCase,
        private readonly getCountryUseCase: GetCountryByIdUseCase,
        private readonly statusCountryUseCase: StatusCountryUseCase,
    ) {}

    createCountryRequest = async (req: Request, res: Response): Promise<void> => {
        try {
            const [error, createCountryDto] = await CreateCountryDto.create(req.body);

            // validate create country dto
            if(error) {
                ResponseUtil.badRequest(res, error);
                return;
            }

            // create country entity to save
            const { name } = createCountryDto!;
            const countryEntity = await this.createCountryUseCase.execute(createCountryDto!.toEntity());
            ResponseUtil.created(res, countryEntity, `Country ${name} created successfully`);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }

    updateCountryRequest = async (req: Request, res: Response): Promise<void> => {
        try {
            const { params, body } = req;
            const [error, updateCountryDto] = await UpdateCountryDto.create(+params.id, body);

            // validate update country dto
            if(error) {
                ResponseUtil.badRequest(res, error);
                return;
            }

            // validate if country exists
            const countryFound = await this.getCountryUseCase.execute(+params.id);
            if(!countryFound) {
                ResponseUtil.notFound(res, `Country with id ${params.id} not found`);
                return;
            }

            // update country entity
            const { name } = updateCountryDto!;
            const countryEntity = await updateCountryDto!.toEntity();
            const countryUpdated = await this.updateCountryUseCase.execute(countryEntity);

            ResponseUtil.ok(res, countryUpdated, `Country ${name} updated successfully`);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }

    getCountriesRequest = async (req: Request, res: Response): Promise<void> => {
        try {
            const { params } = req;
            const [error, getCountriesDto] = await GetCountriesDto.create(+params.active);

            // validate get countries dto
            if(error) {
                ResponseUtil.badRequest(res, error);
                return;
            }

            // get countries
            const countries = await this.getCountriesUseCase.execute(getCountriesDto!.active === 1 ? true : false);
            ResponseUtil.ok(res, countries);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }

    getCountryByIdRequest = async (req: Request, res: Response): Promise<void> => {
        try {
            const { params } = req;

            // validata param is a number
            if(isNaN(+params.id)) {
                ResponseUtil.badRequest(res, 'id param has to be a number');
                return;
            }

            // validate if country exists
            const countryFound = await this.getCountryUseCase.execute(+params.id);
            if(!countryFound) {
                ResponseUtil.notFound(res, `Country with id ${params.id} not found`);
                return;
            }

            ResponseUtil.ok(res, countryFound);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }

    statusCountryRequest = async (req: Request, res: Response): Promise<void> => {
        try {
            const { params, body } = req;
            const [error, statusCountryDto] = await StatusCountryDto.create(+params.id, body);

            // validate status country dto
            if(error) {
                ResponseUtil.badRequest(res, error);
                return;
            }

            // validate if country exists
            const countryFound = await this.getCountryUseCase.execute(+params.id);
            if(!countryFound) {
                ResponseUtil.notFound(res, `Country with id ${params.id} not found`);
                return;
            }

            // change country status
            const { id, active } = statusCountryDto!;
            const countryStatusChanged = await this.statusCountryUseCase.execute(id, active);
            
            ResponseUtil.ok(res, countryStatusChanged, `Country status changed successfully`);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }
}