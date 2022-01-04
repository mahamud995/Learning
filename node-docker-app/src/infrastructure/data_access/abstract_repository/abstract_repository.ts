

export interface ICosmosDBRepository {

    getAll<T>(): Promise<T>;

    getOne<T>(id: string): Promise<T | null>;

    add<T>(document: T): Promise<any>;
    addMany<T>(documents: T[]): Promise<any[]>;

    replaceOne<T>(id: T, document: T, partitionKey: string ): Promise<any>;


}