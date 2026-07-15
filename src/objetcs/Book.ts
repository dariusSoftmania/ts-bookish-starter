export class Book {
    id: number;
    isbn: number;
    title: string;
    copyCount: number;
    reservedCount: number;

    constructor(id: number, isbn: number, title: string, copyCount: number, reservedCount: number) {
        this.id = id;
        this.isbn = isbn;
        this.title = title;
        this.copyCount = copyCount;
        this.reservedCount = reservedCount;
    }
}