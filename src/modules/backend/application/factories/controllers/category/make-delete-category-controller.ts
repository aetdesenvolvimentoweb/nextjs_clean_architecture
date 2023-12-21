import { DeleteCategoryController } from "@/modules/backend/presentation/controllers/category";
import { Controller } from "@/modules/backend/presentation/protocols";
import { makeDeleteCategoryService } from "@/modules/backend/application/factories/services/category";

export const makeDeleteCategoryController = (): Controller => {
  return new DeleteCategoryController(makeDeleteCategoryService());
};
