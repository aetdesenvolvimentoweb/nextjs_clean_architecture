import { AddCategory, Category } from "@/modules/backend/domain/entities";

export interface AddCategoryUseCase {
  add: (data: AddCategory) => Promise<Category>;
}
