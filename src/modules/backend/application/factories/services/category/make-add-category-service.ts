import { AddCategoryService } from "@/modules/backend/data/services/category";
import { CategoryValidation } from "@/modules/backend/data/validations";
import { CategoryInMemoryRepository } from "@/modules/backend/infra/db/in-memory";
import { AdaptMongoIdValidator } from "@/modules/backend/application/adapters";

export const makeAddCategoryService = (): AddCategoryService => {
  const categoryRepository = new CategoryInMemoryRepository();
  const idValidator = new AdaptMongoIdValidator();
  const categoryValidation = new CategoryValidation(
    categoryRepository,
    idValidator
  );
  return new AddCategoryService(categoryRepository, categoryValidation);
};
