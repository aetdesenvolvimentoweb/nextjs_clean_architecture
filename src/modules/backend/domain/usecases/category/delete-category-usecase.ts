import { Category } from "@/modules/backend/domain/entities";

export interface DeleteCategoryUsecase {
  delete: (id: string) => Promise<Category>;
}
