import { GetCategoryByIdService } from "@/modules/backend/data/services/category";
import { CategoryInMemoryRepository } from "@/modules/backend/infra/db/in-memory";
import { AdaptMongoIdValidator } from "../../../adapters";
import { CategoryValidation } from "@/modules/backend/data/validations";

export const makeGetCategoryByIdService = (): GetCategoryByIdService => {
  const categoryRepository = new CategoryInMemoryRepository();
  const idValidator = new AdaptMongoIdValidator();
  const categoryValidation = new CategoryValidation(
    categoryRepository,
    idValidator
  );
  return new GetCategoryByIdService(categoryRepository, categoryValidation);
};
