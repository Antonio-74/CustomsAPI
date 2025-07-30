
export interface IStatusCountryUseCase {
    execute(id: number, active: boolean): Promise<number>;
}