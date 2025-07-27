import { IGetDocumentTypesUseCase } from "../../../domain/ports";
import { DocumentTypeEntity } from "../../../domain/entities";
import { DocumentTypeRepository } from "../../../infraestructure";

export class GetDocumentTypesUseCase implements IGetDocumentTypesUseCase {

    constructor(
        private readonly documentTypeRepository: DocumentTypeRepository
    ) {}

    execute(active: number): Promise<DocumentTypeEntity[]> {
        return this.documentTypeRepository.getDocumentsTypes(active);
    }
}