import {
  DuplicatedUniqueKeyValidation,
  IdValidation,
  MissingParamValidation,
  RegisterValidation,
} from "@/modules/backend/domain/validations";
import { CategoryRepository } from "@/modules/backend/data/repositories";
import { AddCategory } from "@/modules/backend/domain/entities";
import {
  duplicatedKeyError,
  invalidParamError,
  missingParamError,
  noRegisteredError,
} from "@/modules/backend/data/helpers";

export class CategoryValidation
  implements
    MissingParamValidation,
    IdValidation,
    RegisterValidation,
    DuplicatedUniqueKeyValidation
{
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private idValidator: IdValidation
  ) {}

  isMissing = (data: AddCategory): void => {
    const requiredFields: Array<{
      paramName: keyof AddCategory;
      paramLabel: string;
    }> = [{ paramName: "name", paramLabel: "nome" }];

    for (const field of requiredFields) {
      if (!data[field.paramName]) {
        throw missingParamError(field.paramLabel);
      }
    }
  };

  isValid = (id: string): boolean => {
    if (!id) {
      throw missingParamError("ID");
    }

    if (!this.idValidator.isValid(id)) {
      throw invalidParamError("ID");
    }

    return true;
  };

  isRegistered = async (id: string): Promise<void> => {
    const existsCategory = await this.categoryRepository.getById(id);

    if (!existsCategory) {
      throw noRegisteredError("categoria");
    }
  };

  isDuplicated = async (
    key: string,
    id: string | null = null
  ): Promise<void> => {
    const isAlreadyRegistered = await this.categoryRepository.getByName(key);

    if (isAlreadyRegistered && isAlreadyRegistered.name === key) {
      if (id) {
        if (isAlreadyRegistered.id !== id) {
          throw duplicatedKeyError("nome");
        } else {
          return;
        }
      }
      throw duplicatedKeyError("nome");
    }
  };
}
