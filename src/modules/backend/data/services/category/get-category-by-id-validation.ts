import {
  MissingParamValidation,
  RegisteredIdValidation,
} from "@/modules/backend/domain/validations";
import { CategoryRepository } from "@/modules/backend/data/repositories";
import {
  missingParamError,
  noRegisteredError,
} from "@/modules/backend/data/helpers";

export class GetCategoryByIdValidation
  implements MissingParamValidation, RegisteredIdValidation
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  checkMissing = (data: string): void => {
    if (!data) {
      throw missingParamError("id");
    }
  };

  checkExist = async (id: string): Promise<void> => {
    const existsCategory = await this.categoryRepository.getById(id);

    if (!existsCategory || existsCategory.id !== id) {
      throw noRegisteredError("categoria");
    }
  };
}
