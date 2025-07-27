import { MySqlUtil } from "../../../../shared/utils";
import { DocumentTypeEntity } from "../../domain/entities";
import { IDocumentTypeRepository } from "../../domain/ports";

export class DocumentTypeRepository implements IDocumentTypeRepository {

    async create(documentType: DocumentTypeEntity): Promise<number> {
        const { code, name, active } = documentType;
        
        const documentTypeSaved = await MySqlUtil.insert('document_types', {
            name,
            code,
            active: active ? 1 : 0
        });

        return documentTypeSaved;
    }

    async update(documentType: DocumentTypeEntity): Promise<number> {
        const { id, name, code } = documentType;

        const documentTypeUpdated = await MySqlUtil.update('document_types', {
            name,
            code
        }, { id });

        return documentTypeUpdated;
    }

    async getDocumentsTypes(active: number): Promise<DocumentTypeEntity[]> {
        const documentTypes = await MySqlUtil.find<DocumentTypeEntity>(
            'SELECT id, name, code, active FROM document_types WHERE active = ?',
            [active]
        );

        return documentTypes;
    }

    async getDocumentTypeById(id: number): Promise<DocumentTypeEntity> {
        const documentType = await MySqlUtil.findOne<DocumentTypeEntity>(
            'SELECT id, name, code, active FROM document_types WHERE id = ?',
            [id]
        );

        return documentType;
    }

    async statusDocumentType(id: number, active: number): Promise<number> {
        const documentTypeStatusUpdated = await MySqlUtil.update('document_types', {
            active: active
        }, { id });

        return documentTypeStatusUpdated;
    }

    async findDocumentTypeByCode(code: string): Promise<DocumentTypeEntity> {
        const documentTypeFound = await MySqlUtil.findOne<DocumentTypeEntity>(
            'SELECT id, name, code, active FROM document_types WHERE code = ?',
            [code]
        );

        return documentTypeFound;
    }
}