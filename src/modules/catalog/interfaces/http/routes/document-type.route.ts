import { Router } from "express";
import { DocumentTypeController } from "../controllers/document-type.controller";
import { DocumentTypeRepository } from "../../../infraestructure";
import { CreateDocumentTypeUseCase, UpdateDocumentTypeUseCase, GetDocumentTypesUseCase, GetDocumentTypeByIdUseCase, StatusDocumentTypeUseCase, FindDocumentTypeByCodeUseCase } from "../../../application/use-cases";
import { AuthMiddleware } from "../../../../../shared/middlewares/auth.middleware";


export class DocumentTypeRoutes {

    static get routes(): Router {
        const router = Router();

        const documentTypeRepository = new DocumentTypeRepository();
        const createDocumentTypeUseCase = new CreateDocumentTypeUseCase(documentTypeRepository);
        const updateDocumentTypeUseCase = new UpdateDocumentTypeUseCase(documentTypeRepository);
        const getDocumentsTypesUseCase = new GetDocumentTypesUseCase(documentTypeRepository);
        const getDocumentTypeByIdUseCase = new GetDocumentTypeByIdUseCase(documentTypeRepository);
        const statusDocumentTypeUseCase = new StatusDocumentTypeUseCase(documentTypeRepository);
        const findDocumentTypeByCodeUseCase = new FindDocumentTypeByCodeUseCase(documentTypeRepository);

        const controller = new DocumentTypeController(createDocumentTypeUseCase, updateDocumentTypeUseCase, getDocumentsTypesUseCase, getDocumentTypeByIdUseCase, statusDocumentTypeUseCase, findDocumentTypeByCodeUseCase);

        router.post('/', AuthMiddleware.verifyOpeRole, controller.createDocumentTypeRequest);
        router.put('/:id', AuthMiddleware.verifyOpeRole, controller.updateDocumentTypeRequest);
        router.get('/by-id/:id', AuthMiddleware.verifyOpeRole, controller.getDocumentTypeByIdRequest);
        router.get('/:active', AuthMiddleware.verifyOpeRole, controller.getDocumentsTypesRequest);
        router.patch('/status/:id', AuthMiddleware.verifyOpeRole, controller.statusDocumentTypeRequest);

        return router;
    }
}