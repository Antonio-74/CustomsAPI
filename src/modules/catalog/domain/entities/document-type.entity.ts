export class DocumentTypeEntity {
    constructor(
        public id: number,
        public name: string,
        public code: string,
        public active: boolean
    ) {}
}