import { Request, Response } from "express";
import { ResponseUtil } from "../../../../../shared/utils";
import { CreateMeasurementUnitDto, GetMeasurementUnitsDto, StatusMeasurementUnitDto, UpdateMeasurementUnitDto } from "../../../application/dtos";
import { CreateMeasurementUnitUseCase, GetMeasurementUnitByIdUseCase, GetMeasurementUnitsUseCase, StatusMeasurementUnitUseCase, UpdateMeasurementUnitUseCase } from "../../../application/use-cases";

export class MeasurementUnitController {

    constructor(
        private readonly createMeasurementUnitUseCase: CreateMeasurementUnitUseCase,
        private readonly updateMeasurementUnitUseCase: UpdateMeasurementUnitUseCase,
        private readonly getMeasurementUnitsUseCase: GetMeasurementUnitsUseCase,
        private readonly getMeasurementUnitUseCase: GetMeasurementUnitByIdUseCase,
        private readonly statusMeasurementUnitUseCase: StatusMeasurementUnitUseCase,
    ) {}

    createMeasurementUnitRequest = async (req: Request, res: Response): Promise<void> => {
        try {
            const { body } = req;
            const [error, createMeasurementUnitDto] = await CreateMeasurementUnitDto.create(body);

            // validate create measurement unit dto
            if(error) {
                ResponseUtil.badRequest(res, error);
                return;
            }

            // create measurement unit entity to save
            const { name } = createMeasurementUnitDto!;
            const measurementUnitEntity = await this.createMeasurementUnitUseCase.execute(createMeasurementUnitDto!.toEntity());
            ResponseUtil.created(res, measurementUnitEntity, `Measurement unit ${name} created successfully`);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }

    updateMeasurementUnitRequest = async (req: Request, res: Response): Promise<void> => {
        try {
            const { params, body } = req;
            const [error, updateMeasurementUnitDto] = await UpdateMeasurementUnitDto.create(+params.id, body);

            // validate update measurement unit dto
            if(error) {
                ResponseUtil.badRequest(res, error);
                return;
            }

            // validate if measurement unit exists
            const measurementUnitFound = await this.getMeasurementUnitUseCase.execute(+params.id);
            if(!measurementUnitFound) {
                ResponseUtil.notFound(res, `Measurement unit with id ${params.id} not found`);
                return;
            }

            // update measurement unit entity
            const { name } = updateMeasurementUnitDto!;
            const measurementUnitEntity = await this.updateMeasurementUnitUseCase.execute(updateMeasurementUnitDto!.toEntity());
            ResponseUtil.ok(res, measurementUnitEntity, `Measurement unit ${name} updated successfully`);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }

    getMeasurementUnitsRequest = async (req: Request, res: Response): Promise<void> => {
        try {
            const { params } = req;
            const [error, getMeasurementUnitsDto] = await GetMeasurementUnitsDto.create(+params.active);

            // validate get measurement units dto
            if(error) {
                ResponseUtil.badRequest(res, error);
                return;
            }

            // get measurement units
            const measurementUnits = await this.getMeasurementUnitsUseCase.execute(getMeasurementUnitsDto!.active);
            ResponseUtil.ok(res, measurementUnits, `Measurement units retrieved successfully`);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }

    getMeasurementUnitByIdRequest = async (req: Request, res: Response): Promise<void> => {
        try {
            const { params } = req;
            
            // validate measurement unit id param
            if(isNaN(+params.id)) {
                ResponseUtil.badRequest(res, `Invalid measurement unit id: ${params.id}`);
                return;
            }

            // get measurement unit by id
            const measurementUnitFound = await this.getMeasurementUnitUseCase.execute(+params.id);
            if(!measurementUnitFound) {
                ResponseUtil.notFound(res, `Measurement unit with id ${params.id} not found`);
                return;
            }

            ResponseUtil.ok(res, measurementUnitFound);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }

    statusMeasurementUnitRequest = async (req: Request, res: Response): Promise<void> => {
        try {
            const { params, body } = req;
            const [error, statusMeasurementUnitDto] = await StatusMeasurementUnitDto.create(+params.id, body);

            // validate status measurement unit dto
            if(error) {
                ResponseUtil.badRequest(res, error);
                return;
            }

            // validate if measurement unit exists
            const measurementUnitFound = await this.getMeasurementUnitUseCase.execute(+params.id);
            if(!measurementUnitFound) {
                ResponseUtil.notFound(res, `Measurement unit with id ${params.id} not found`);
                return;
            }

            // update status of measurement unit entity
            const { id, active } = statusMeasurementUnitDto!;
            const measurementUnitEntity = await this.statusMeasurementUnitUseCase.execute(id, active);
            ResponseUtil.ok(res, measurementUnitEntity, `Measurement unit ${active ? 'activated' : 'deactivated'} successfully`);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }
}