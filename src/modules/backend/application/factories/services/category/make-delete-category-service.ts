import { DeleteCategoryService } from "@/modules/backend/data/services/category";
import { CategoryInMemoryRepository } from "@/modules/backend/infra/db/in-memory";
import { AdaptMongoIdValidator } from "@/modules/backend/application/adapters";
import { CategoryValidation } from "@/modules/backend/data/validations";

export const makeDeleteCategoryService = (): DeleteCategoryService => {
  const categoryRepository = new CategoryInMemoryRepository();
  const idValidator = new AdaptMongoIdValidator();
  const categoryValidation = new CategoryValidation(
    categoryRepository,
    idValidator
  );
  return new DeleteCategoryService(categoryRepository, categoryValidation);
};
