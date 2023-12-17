import { Category } from "../../entities";

export interface GetCategoryByIdUsecase {
  getById: (id: string) => Promise<Category | null>;
}
