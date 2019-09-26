import { Category } from './category.model';
import { Tag } from './tag.model';

export const enum CourseLevel {
    'BEGINNER',
    'INTERMEDIATE',
    'ADVANCED'
}

export class Course  {
    constructor(
        public id?: number,
        public pictureContentType?: string,
        public picture?: any,
        public title?: string,
        public subtitle?: string,
        public startDate?: any,
        public endDate?: any,
        public price?: number,
        public level?: CourseLevel,
        public tutor?: string,
        public contactInfo?: string,
        public requirements?: string,
        public description?: string,
        public location?: string,
        public hours?: number,
        public category?: Category,
        public tags?: Tag[],
    ) {
    }
}
