import { GetAllCategoriesController } from "@/modules/backend/presentation/controllers/category";
import { Controller } from "@/modules/backend/presentation/protocols";
import { makeGetAllCategoriesService } from "@/modules/backend/application/factories/services/category";

export const makeGetAllCategoriesController = (): Controller => {
  return new GetAllCategoriesController(makeGetAllCategoriesService());
};
