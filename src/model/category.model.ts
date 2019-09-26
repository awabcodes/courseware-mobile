import { Course } from './course.model';
import { Favorite } from './favorite.model';

export class Category {
    constructor(
        public id?: number,
        public name?: string,
        public courses?: Course[],
        public favorites?: Favorite[],
    ) {
    }
}
