
export interface IStatusDocumentTypeUseCase {
    execute(id: number, active: number): Promise<number>;
}