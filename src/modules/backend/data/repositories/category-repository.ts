import { AddCategory, Category } from "@/modules/backend/domain/entities";

export interface CategoryRepository {
  add: (data: AddCategory) => Promise<Category>;
}
