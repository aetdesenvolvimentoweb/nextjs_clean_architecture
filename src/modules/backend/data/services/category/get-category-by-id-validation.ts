import {
  MissingParamValidation,
  RegisteredIdValidation,
} from "@/modules/backend/domain/validations";
import { CategoryRepository } from "@/modules/backend/data/repositories";
import { CustomAppError } from "@/modules/backend/domain/errors";

export class GetCategoryByIdValidation
  implements MissingParamValidation, RegisteredIdValidation
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  checkMissing = (data: string): void => {
    if (!data) {
      throw new CustomAppError("Preencha o campo ID.");
    }
  };

  checkExist = async (id: string): Promise<void> => {
    const existsCategory = await this.categoryRepository.getById(id);

    if (!existsCategory) {
      throw new CustomAppError("Nenhuma categoria encontrada com esse ID.");
    }
  };
}
