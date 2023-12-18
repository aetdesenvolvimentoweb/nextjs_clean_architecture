import {
  MissingParamValidation,
  RegisteredIdValidation,
} from "@/modules/backend/domain/validations";
import { CategoryRepository } from "../../repositories";
import { missingParamError, noRegisteredError } from "../../helpers";

export class DeleteCategoryValidation
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
