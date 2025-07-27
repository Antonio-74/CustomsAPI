import { DocumentTypeEntity } from "../../entities";

export interface ICreateDocumentTypeUseCase {
    execute(documentType: DocumentTypeEntity): Promise<number>;
}