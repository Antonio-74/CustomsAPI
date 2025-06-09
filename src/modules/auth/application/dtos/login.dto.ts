
export class LoginDto {

    constructor (
        public username: string,
        public password: string,
    ) {}

    static async create(props: {[key: string]: string | number} = {}): Promise<[string?, LoginDto?]> {
        if(!props) return ['Invalid request data'];
        const { username, password } = props;

        if(!username) return ['username is required'];
        if(!password) return ['password id required'];

        return [
            undefined, 
            new LoginDto(
                username as string, 
                password as string, 
            )];
    }
}