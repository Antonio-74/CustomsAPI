import { Request, Response } from "express";
import { ICreateUseCase, IGetCustomerByCodeUseCase, IGetCustomerByIdUseCase, IGetCustomersUseCase, IStatusCustomerUseCase, IUpdateUseCase } from "../../../domain/ports";
import { ResponseUtil } from "../../../../../shared/utils";
import { CreateDto, GetCustomersDto, StatusCustomerDto, UpdateDto } from "../../../application/dtos";

export class CustomerController {

    constructor(
        private readonly createUseCase: ICreateUseCase,
        private readonly updateUseCase: IUpdateUseCase,
        private readonly getCustomerByCodeUseCase: IGetCustomerByCodeUseCase,
        private readonly getCustomerByIdUseCase: IGetCustomerByIdUseCase,
        private readonly getCustomersUseCase: IGetCustomersUseCase,
        private readonly statusCustomerUseCase: IStatusCustomerUseCase,
    ) {}

    createRequest = async(req: Request, res: Response): Promise<void> => {
        try {
            const { body } = req;
            const [ error, createDto ] = await CreateDto.create(body);

            // validate create customer dto
            if(error) {
                ResponseUtil.badRequest(res, error);
                return;
            }

            // validate if customer code already exists
            const customerCodeExists = await this.getCustomerByCodeUseCase.execute(createDto!.code);
            if(customerCodeExists) {
                ResponseUtil.badRequest(res, `Code ${createDto!.code} already exists!`);
                return;
            }

            // create customer entity and saved
            const customerEntity = await createDto!.toEntity();
            const customerSaved = await this.createUseCase.execute(customerEntity);

            ResponseUtil.created(res, customerSaved, `Customer ${createDto!.name} created successfully`);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }

    updateRequest = async(req: Request, res: Response): Promise<void> => {
        try {
            const { params, body } = req;
            const [ error, updateDto ] = await UpdateDto.create(body, +params.id);

            // validate update customer dto
            if(error) {
                ResponseUtil.badRequest(res, error);
                return;
            }

            // validate if customer exist
            const customerFound = await this.getCustomerByIdUseCase.execute(updateDto!.id);
            if(!customerFound) {
                ResponseUtil.badRequest(res, `Customer with id ${updateDto?.id} not found!`);
                return;
            } 

            // create customer entity and updated
            const customerEntity = await updateDto!.toEntity();
            const customerUpdated = await this.updateUseCase.execute(customerEntity);

            ResponseUtil.ok(res, customerUpdated, `Customer ${updateDto?.name} updated successfully`);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }

    getCustomersRequest = async(req: Request, res: Response): Promise<void> => {
        try {
            const { params } = req;
            const [ error, getCustomersDto ] = await GetCustomersDto.create(+params.active);
            
            // validate get-custoemrs dto
            if(error) {
                ResponseUtil.badRequest(res, error);
                return;
            }

            // get customers
            const customers = await this.getCustomersUseCase.execute(getCustomersDto!.active);
            ResponseUtil.ok(res, customers);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }

    getCustomerRequest = async(req: Request, res: Response): Promise<void> => {
        try {
            const { params } = req;
            const id: number = +params.id;

            // validate if id param is a number
            if(isNaN(id)) {
                ResponseUtil.badRequest(res, `id param has to be a number`);
                return;
            }

            // validate if customer extist
            const customerFound = await this.getCustomerByIdUseCase.execute(id);
            if(!customerFound) {
                ResponseUtil.badRequest(res, `Customer with id ${id} was not found!`);
                return;
            }

            // return customer object
            ResponseUtil.ok(res, customerFound);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }

    statusCustomerRequest = async(req: Request, res: Response): Promise<void> => {
        try {
            const { body, params } = req;
            const [ error, statusCustomerDto ] = await StatusCustomerDto.create(body, +params.id);

            // validate status customer dto
            if(error) {
                ResponseUtil.badRequest(res, error);
                return;
            }

            // validate if customer exists
            const customerFound = await this.getCustomerByIdUseCase.execute(statusCustomerDto!.id);
            if(!customerFound) {
                ResponseUtil.badRequest(res, `Customer with id ${statusCustomerDto!.id} was not found!`);
                return;
            }

            // update status customer
            const statusCustomerUpdate = await this.statusCustomerUseCase.execute(statusCustomerDto!.id, statusCustomerDto!.active);

            ResponseUtil.ok(res, statusCustomerUpdate, `Status customer has been updated`);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }
}