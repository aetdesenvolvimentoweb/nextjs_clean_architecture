import {
  MissingParamValidation,
  RegisteredIdValidation,
} from "@/modules/backend/domain/validations";
import { CategoryRepository } from "../../repositories";
import { missingParamError, noRegisteredError } from "../../helpers";
import { Category } from "@/modules/backend/domain/entities";

export class UpdateCategoryValidation
  implements MissingParamValidation, RegisteredIdValidation
{
  constructor(private readonly categoryRepository: CategoryRepository) {}

  checkMissing = (data: Category): void => {
    const requiredFields: Array<{
      paramName: keyof Category;
      paramLabel: string;
    }> = [
      { paramName: "id", paramLabel: "ID" },
      { paramName: "name", paramLabel: "nome" },
    ];

    for (const field of requiredFields) {
      if (!data[field.paramName]) {
        throw missingParamError(field.paramLabel);
      }
    }
  };

  checkExist = async (id: string): Promise<void> => {
    const existsCategory = await this.categoryRepository.getById(id);

    if (!existsCategory || existsCategory.id !== id) {
      throw noRegisteredError("categoria");
    }
  };
}
