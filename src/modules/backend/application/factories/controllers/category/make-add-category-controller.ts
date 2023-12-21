import { AddCategoryController } from "@/modules/backend/presentation/controllers/category";
import { Controller } from "@/modules/backend/presentation/protocols";
import { makeAddCategoryService } from "@/modules/backend/application/factories/services/category";

export const makeAddCategoryController = (): Controller => {
  return new AddCategoryController(makeAddCategoryService());
};
