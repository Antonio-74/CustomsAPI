import { ICreateDocumentTypeUseCase } from "../../../domain/ports";
import { DocumentTypeEntity } from "../../../domain/entities";
import { DocumentTypeRepository } from "../../../infraestructure";

export class CreateDocumentTypeUseCase implements ICreateDocumentTypeUseCase {

    constructor(
        private readonly documentTypeRepository: DocumentTypeRepository
    ) {}

    execute(documentType: DocumentTypeEntity): Promise<number> {
        return this.documentTypeRepository.create(documentType);
    }
}