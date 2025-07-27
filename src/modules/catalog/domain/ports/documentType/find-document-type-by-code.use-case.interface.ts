import { DocumentTypeEntity } from "../../entities";

export interface IFindDocumentTypeByCodeUseCase {
    execute(code: string): Promise<DocumentTypeEntity>;
}