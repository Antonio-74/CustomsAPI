
export class CustomerEntity {

    constructor(
       public id: number,
       public name: string,
       public code: string,
       public email: string,
       public address: string,
       public active: boolean 
    ) {}
}