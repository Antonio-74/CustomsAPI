import { IGetDocumentTypeByIdUseCase } from "../../../domain/ports";
import { DocumentTypeEntity } from "../../../domain/entities";
import { DocumentTypeRepository } from "../../../infraestructure";

export class GetDocumentTypeByIdUseCase implements IGetDocumentTypeByIdUseCase {

    constructor(
        private readonly documentTypeRepository: DocumentTypeRepository
    ) {}

    execute(id: number): Promise<DocumentTypeEntity> {
        return this.documentTypeRepository.getDocumentTypeById(id);
    }
}   