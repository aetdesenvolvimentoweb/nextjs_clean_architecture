import { Category } from "../../entities";

export interface GetAllCategoriesUsecase {
  getAll: () => Promise<Category[]>;
}
