import { IFindDocumentTypeByCodeUseCase } from "../../../domain/ports";
import { DocumentTypeEntity } from "../../../domain/entities";
import { DocumentTypeRepository } from "../../../infraestructure";

export class FindDocumentTypeByCodeUseCase implements IFindDocumentTypeByCodeUseCase {

    constructor(
        private readonly documentTypeRepository: DocumentTypeRepository
    ) {}

    async execute(code: string): Promise<DocumentTypeEntity> {
        return await this.documentTypeRepository.findDocumentTypeByCode(code);
    }
}   