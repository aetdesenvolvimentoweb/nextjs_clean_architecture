import {
  DuplicatedUniqueKeyValidation,
  MissingParamValidation,
} from "@/modules/backend/domain/validations";
import { CategoryRepository } from "@/modules/backend/data/repositories";
import { AddCategory } from "@/modules/backend/domain/entities";
import {
  duplicatedKeyError,
  missingParamError,
} from "@/modules/backend/data/helpers";

export class AddCategoryDataValidation
  implements MissingParamValidation, DuplicatedUniqueKeyValidation
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  checkMissing = (data: AddCategory): void => {
    if (!data.name) {
      throw missingParamError("nome");
    }
  };

  checkDuplicated = async (key: string): Promise<void> => {
    const isAlreadyRegistered = await this.categoryRepository.getByName(key);

    if (isAlreadyRegistered && isAlreadyRegistered.name === key) {
      throw duplicatedKeyError("nome");
    }
  };
}
