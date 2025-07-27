import { DocumentTypeEntity } from "../../entities";

export interface IUpdateDocumentTypeUseCase {
    execute(documentType: DocumentTypeEntity): Promise<number>;
}