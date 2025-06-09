import { compareSync, genSaltSync, hashSync } from 'bcrypt';

export class BcryptUtil {

    public static async hash(password: string) {
        const salt = genSaltSync();
        return hashSync(password, salt);
    }

    public static async compare(password: string, hashed: string) {
        return compareSync(password, hashed);
    }
}