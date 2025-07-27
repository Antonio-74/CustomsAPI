import { IUpdateDocumentTypeUseCase } from "../../../domain/ports";
import { DocumentTypeEntity } from "../../../domain/entities";
import { DocumentTypeRepository } from "../../../infraestructure";

export class UpdateDocumentTypeUseCase implements IUpdateDocumentTypeUseCase {

    constructor(
        private readonly documentTypeRepository: DocumentTypeRepository
    ) {}

    execute(documentType: DocumentTypeEntity): Promise<number> {
        return this.documentTypeRepository.update(documentType);
    }
}