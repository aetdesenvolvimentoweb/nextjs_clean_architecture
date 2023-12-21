import { GetAllCategoriesService } from "@/modules/backend/data/services/category";
import { CategoryInMemoryRepository } from "@/modules/backend/infra/db/in-memory";

export const makeGetAllCategoriesService = (): GetAllCategoriesService => {
  const categoryRepository = new CategoryInMemoryRepository();
  return new GetAllCategoriesService(categoryRepository);
};
