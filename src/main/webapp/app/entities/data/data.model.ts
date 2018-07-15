import { BaseEntity } from './../../shared';

export class Data implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public value?: number,
        public createdAt?: any,
    ) {
    }
}
