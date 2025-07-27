import { DocumentTypeEntity } from "../../entities";

export interface IDocumentTypeRepository {
    create(documentType: DocumentTypeEntity): Promise<number>;
    update(documentType: DocumentTypeEntity): Promise<number>;
    getDocumentsTypes(active: number): Promise<DocumentTypeEntity[]>;
    getDocumentTypeById(id: number): Promise<DocumentTypeEntity>; 
    findDocumentTypeByCode(code: string): Promise<DocumentTypeEntity>;
    statusDocumentType(id: number, active: number): Promise<number>;
}