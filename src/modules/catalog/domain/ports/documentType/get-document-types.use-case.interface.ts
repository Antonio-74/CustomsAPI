import { DocumentTypeEntity } from "../../entities";

export interface IGetDocumentTypesUseCase {
    execute(active: number): Promise<DocumentTypeEntity[]>;
}