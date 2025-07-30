import { Request, Response } from "express";
import { ICreateDocumentTypeUseCase, IStatusDocumentTypeUseCase, IUpdateDocumentTypeUseCase, IGetDocumentTypesUseCase, IGetDocumentTypeByIdUseCase, IFindDocumentTypeByCodeUseCase } from "../../../domain/ports";
import { ResponseUtil } from "../../../../../shared/utils";
import { CreateDocumentTypeDto, UpdateDocumentTypeDto, GetDocumentTypesDto, StatusDocumentTypeDto } from "../../../application/dtos";

export class DocumentTypeController {

    constructor(
        private readonly createDocumentTypeUseCase: ICreateDocumentTypeUseCase,
        private readonly updateDocumentTypeUseCase: IUpdateDocumentTypeUseCase,
        private readonly getDocumentsTypesUseCase: IGetDocumentTypesUseCase,
        private readonly getDocumentTypeByIdUseCase: IGetDocumentTypeByIdUseCase,
        private readonly statusDocumentTypeUseCase: IStatusDocumentTypeUseCase,
        private readonly findDocumentTypeByCodeUseCase: IFindDocumentTypeByCodeUseCase
    ) {}

    createDocumentTypeRequest = async(req: Request, res: Response): Promise<void> => {
        try {
            const { body } = req;
            const [ error, createDocumentTypeDto ] = await CreateDocumentTypeDto.create(body);

            // validate create document type dto
            if(error) {
                ResponseUtil.badRequest(res, error);    
                return;
            }

            // check if document type code already exists
            const documentTypeCodeFound = await this.findDocumentTypeByCodeUseCase.execute(createDocumentTypeDto!.code);
            if(documentTypeCodeFound) {
                ResponseUtil.badRequest(res, `Document type code ${createDocumentTypeDto!.code} already exists`);
                return;
            }

            // create document type entity to save
            const { name } = createDocumentTypeDto!;
            const documentTypeEntity = await createDocumentTypeDto!.toEntity();
            const documentTypeCreated = await this.createDocumentTypeUseCase.execute(documentTypeEntity);

            ResponseUtil.created(res, documentTypeCreated, `Document type ${name} created successfully`);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }

    updateDocumentTypeRequest = async(req: Request, res: Response): Promise<void> => {
        try {
            const { params, body } = req;
            const [ error, updateDocumentTypeDto ] = await UpdateDocumentTypeDto.create(+params.id, body);

            // validate update document type dto
            if(error) {
                ResponseUtil.badRequest(res, error);
                return;
            }

            // validate if document type exist
            const documentTypeFound = await this.getDocumentTypeByIdUseCase.execute(+params.id);
            if(!documentTypeFound) {
                ResponseUtil.notFound(res, `Document type with id ${params.id} was not found!`);
                return;
            }

            // check if document type code already exists
            if(updateDocumentTypeDto!.code !== documentTypeFound.code) {
                const documentTypeCodeFound = await this.findDocumentTypeByCodeUseCase.execute(updateDocumentTypeDto!.code);
                if(documentTypeCodeFound) {
                    ResponseUtil.badRequest(res, `Document type code ${updateDocumentTypeDto!.code} already exists`);
                    return;
                }
            }

            // create document type entity to update
            const { name } = updateDocumentTypeDto!;
            const documentTypeEntity = await updateDocumentTypeDto!.toEntity();
            const documentTypeUpdated = await this.updateDocumentTypeUseCase.execute(documentTypeEntity);

            ResponseUtil.ok(res, documentTypeUpdated, `Document type ${name} updated successfully`);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }

    getDocumentTypeByIdRequest = async(req: Request, res: Response): Promise<void> => {
        try {
            const { params } = req;

            // validate if id param is number
            if(isNaN(+params.id)) {
                ResponseUtil.badRequest(res, `id param has to be a number`);
                return;
            }

            // get document type
            const documentType = await this.getDocumentTypeByIdUseCase.execute(+params.id);

            if(!documentType) {
                ResponseUtil.notFound(res, `Document type with id ${+params.id} was not found!`);
                return;
            }

            ResponseUtil.ok(res, documentType);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }

    getDocumentsTypesRequest = async(req: Request, res: Response): Promise<void> => {
        try {
            const { params } = req;
            const [ error, getDocumentsTypesDto ] = await GetDocumentTypesDto.create(+params.active);

            // validate get documents types dto
            if(error) {
                ResponseUtil.badRequest(res, error);
                return;
            }

            // get documents types
            const { active } = getDocumentsTypesDto!;
            const documentsTypes = await this.getDocumentsTypesUseCase.execute(active);

            ResponseUtil.ok(res, documentsTypes);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }

    statusDocumentTypeRequest = async(req: Request, res: Response): Promise<void> => {
        try {
            const { body, params } = req;
            const [ error, statusDocumentTypeDto ] = await StatusDocumentTypeDto.create(+params.id, body);

            // validate status document type dto
            if(error) {
                ResponseUtil.badRequest(res, error);
                return;
            }

            // check if document type exist
            const documentTypeFound = await this.getDocumentTypeByIdUseCase.execute(+params.id);
            if(!documentTypeFound) {
                ResponseUtil.notFound(res, `Document type with id ${params.id} was not found!`);
                return;
            }

            // change document type status
            const { id, active } = statusDocumentTypeDto!;
            const documentTypeStatusUpdated = await this.statusDocumentTypeUseCase.execute(id, active ? 1 : 0);

            ResponseUtil.ok(res, documentTypeStatusUpdated, `Document type status updated successfully`);
        } catch (error) {
            ResponseUtil.internalError(res, error as string);
        }
    }
}