import { QueryDTO } from "../common/query";

export interface VideoLearningQueryDTO extends QueryDTO {
    categoriesId?: number;
    subcategoriesId?:number
}