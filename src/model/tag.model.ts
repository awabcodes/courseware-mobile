import { Course } from './course.model';

export class Tag {
    constructor(
        public id?: number,
        public name?: string,
        public courses?: Course[],
    ) {
    }
}
