import { UpdateCategoryController } from "@/modules/backend/presentation/controllers/category";
import { Controller } from "@/modules/backend/presentation/protocols";
import { makeUpdateCategoryService } from "@/modules/backend/application/factories/services/category";

export const makeUpdateCategoryController = (): Controller => {
  return new UpdateCategoryController(makeUpdateCategoryService());
};
