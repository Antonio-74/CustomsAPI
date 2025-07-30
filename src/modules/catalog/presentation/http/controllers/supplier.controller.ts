import { Request, Response } from "express";
import { ICreateSupplierUseCase, IGetSupplierByIdUseCase, IGetSuppliersUseCase, IStatusSupplierUseCase, IUpdateSupplierUseCase } from "../../../domain/ports";
import { ResponseUtil } from "../../../../../shared/utils";
import { CreateSupplierDto, GetSuppliersDto, StatusSupplierDto, UpdateSupplierDto } from "../../../application/dtos";

export class SupplierController {

    constructor(
        private readonly createSupplierUseCase: ICreateSupplierUseCase,
        private readonly updateSupplierUseCase: IUpdateSupplierUseCase,
        private readonly getSupplierByIdUseCase: IGetSupplierByIdUseCase,
        private readonly getSuppliersUseCase: IGetSuppliersUseCase,
        private readonly statusSupplierUseCase: IStatusSupplierUseCase,
    ) {}

    createSupplierRequest = async(req: Request, res: Response): Promise<void> => {
        try {
            const { body } = req;
            const [ error, createSupplierDto ] = await CreateSupplierDto.create(body);

            // validate create supplier dto
            if(error) {
                ResponseUtil.badRequest(res, error);
                return;
            }

            // create supplier entity and save
            const supplierEntity = await createSupplierDto!.toEntity();
            const supplierCreated = await this.createSupplierUseCase.execute(supplierEntity);

            ResponseUtil.created(res, supplierCreated, `Supplier ${createSupplierDto!.name} created successfully`);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }

    updateSupplierRequest = async(req: Request, res: Response):Promise<void> => {
        try {
            const { params, body } = req;
            const [ error, updateSupplierDto ] = await UpdateSupplierDto.create(body, +params.id);

            // validate update supplier dto
            if(error) {
                ResponseUtil.badRequest(res, error);
                return;
            }

            // validate if supplier exist
            const supplierFound = await this.getSupplierByIdUseCase.execute(updateSupplierDto!.id);
            if(!supplierFound) {
                ResponseUtil.notFound(res, `Supplier with id ${updateSupplierDto!.id} was not found!`);
                return;
            }

            // create supplier entity and update
            const supplierEntity = await updateSupplierDto!.toEntity();
            const supplerUpdated = await this.updateSupplierUseCase.execute(supplierEntity);

            ResponseUtil.ok(res, supplerUpdated, `Supplier ${updateSupplierDto!.name} was updated successfully`);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }

    getSupplierByIdRequest = async(req: Request, res: Response):Promise<void> => {
        try {
            const { params } = req;

            // validate if id param is number
            if(isNaN(+params.id)) {
                ResponseUtil.badRequest(res, `id param has to be a number`);
                return;
            }

            // get supplier
            const supplier = await this.getSupplierByIdUseCase.execute(+params.id);

            if(!supplier) {
                ResponseUtil.notFound(res, `Supplier with id ${+params.id} was not found!`);
                return;
            }
            
            ResponseUtil.ok(res, supplier);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }

    getSuppliersRequest = async(req: Request, res: Response):Promise<void> => {
        try {
            const { params } = req;
            const [ error, getSupplierDto ] = await GetSuppliersDto.create(+params.idCustomer, +params.active);

            // validate get supplier dto
            if(error) {
                ResponseUtil.badRequest(res, error);
                return;
            }

            // get suppliers
            const { id, active } = getSupplierDto!
            const suppliers = await this.getSuppliersUseCase.execute(id, active);
            ResponseUtil.ok(res, suppliers);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }

    statusSupplierRequest = async(req: Request, res: Response): Promise<void> => {
        try {
            const { body, params } = req;
            const [ error, statusSupplierDto ] = await StatusSupplierDto.create(+params.id, body);

            // validate status supplier dto
            if(error) {
                ResponseUtil.badRequest(res, error);
                return;
            }

            // change supplier status
            const { id, active } = statusSupplierDto!;
            const supplierStatusUpdated = await this.statusSupplierUseCase.execute(id, active);

            ResponseUtil.ok(res, supplierStatusUpdated, `Supplier status updated successfully`);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }
}