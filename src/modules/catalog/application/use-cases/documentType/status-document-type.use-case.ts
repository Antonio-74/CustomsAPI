import { IStatusDocumentTypeUseCase } from "../../../domain/ports";
import { DocumentTypeRepository } from "../../../infraestructure";

export class StatusDocumentTypeUseCase implements IStatusDocumentTypeUseCase {

    constructor(
        private readonly documentTypeRepository: DocumentTypeRepository
    ) {}

    execute(id: number, active: number): Promise<number> {
        return this.documentTypeRepository.statusDocumentType(id, active);
    }
}   