import { Category } from "@/modules/backend/domain/entities";

export interface UpdateCategoryUsecase {
  update: (id: string, data: ParamsUpdate) => Promise<Category>;
}

export type ParamsUpdate = {
  name: string;
};
