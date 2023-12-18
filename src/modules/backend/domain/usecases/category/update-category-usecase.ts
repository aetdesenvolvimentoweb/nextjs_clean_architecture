import { Category } from "../../entities";

export interface UpdateCategoryUsecase {
  update: (id: string, data: ParamsUpdate) => Promise<Category>;
}

export type ParamsUpdate = {
  name: string;
};
