import {
  DuplicatedUniqueKeyValidation,
  MissingParamValidation,
} from "@/modules/backend/domain/validations";
import { CategoryRepository } from "@/modules/backend/data/repositories";
import { CustomAppError } from "@/modules/backend/domain/errors";
import { AddCategory } from "@/modules/backend/domain/entities";

export class AddCategoryDataValidation
  implements MissingParamValidation, DuplicatedUniqueKeyValidation
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  checkMissing = (data: AddCategory): void => {
    if (!data.name) {
      throw new CustomAppError("Preencha o campo nome.");
    }
  };

  checkDuplicated = async (key: string): Promise<void> => {
    const isAlreadyRegistered = await this.categoryRepository.getByName(key);

    if (isAlreadyRegistered && isAlreadyRegistered.name === key) {
      throw new CustomAppError(
        "Já existe uma categoria registrada com esse nome."
      );
    }
  };
}
