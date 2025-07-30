import { MySqlUtil } from "../../../../shared/utils";
import { SupplierEntity } from "../../domain/entities";
import { ISupplierRepository } from "../../domain/ports";

export class SupplierRepository implements ISupplierRepository {
    
    async create(supplier: SupplierEntity): Promise<number> {
        const { name, customerId, active } = supplier;

        const supplierSavedId = await MySqlUtil.insert('suppliers', {
            name,
            customerId,
            active
        });

        return supplierSavedId;
    }

    async update(supplier: SupplierEntity): Promise<number> {
        const { id, name, customerId } = supplier;
        
        const supplierUpdated = await MySqlUtil.update(
            'suppliers',
            { name, customerId },
            { id }
        );

        return supplierUpdated;
    }

    async getSuppliers(customerId: number, active: number): Promise<SupplierEntity[]> {
        const suppliers = await MySqlUtil.callProcedure<SupplierEntity>('get_suppliers', [customerId, active]);

        return suppliers;
    }

    async getSupplierById(id: number): Promise<SupplierEntity> {
        const supplier = await MySqlUtil.findOne<SupplierEntity>(
            'SELECT id, name, customerId, active FROM suppliers WHERE id = ?',
            [id]
        );

        return supplier;
    }

    async statusSupplier(id: number, active: number): Promise<number> {
        const statusUpdated = await MySqlUtil.update(
            'suppliers',
            { active: active },
            { id }
        );

        return statusUpdated;
    }
} 