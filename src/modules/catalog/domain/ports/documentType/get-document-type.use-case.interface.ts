import { DocumentTypeEntity } from "../../entities";

export interface IGetDocumentTypeByIdUseCase {
    execute(id: number): Promise<DocumentTypeEntity>;
}