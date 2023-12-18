import { AddCategory, Category } from "@/modules/backend/domain/entities";

export interface AddCategoryUsecase {
  add: (data: AddCategory) => Promise<Category>;
}
