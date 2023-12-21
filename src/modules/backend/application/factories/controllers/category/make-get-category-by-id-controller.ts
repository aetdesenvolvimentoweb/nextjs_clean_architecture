import { GetCategoryByIdController } from "@/modules/backend/presentation/controllers/category";
import { Controller } from "@/modules/backend/presentation/protocols";
import { makeGetCategoryByIdService } from "@/modules/backend/application/factories/services/category";

export const makeGetCategoryByIdController = (): Controller => {
  return new GetCategoryByIdController(makeGetCategoryByIdService());
};
