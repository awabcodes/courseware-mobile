import { User } from './user.model';
import { Category } from './category.model';

export class Favorite {
    constructor(
        public id?: number,
        public user?: User,
        public categories?: Category[],
    ) {
    }
}
