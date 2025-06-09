
export interface IValidateUserUserCase {
    execute(password: string, comparePassword: string): Promise<boolean>;
}