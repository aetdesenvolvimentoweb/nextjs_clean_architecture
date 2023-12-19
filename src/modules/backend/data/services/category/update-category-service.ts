import {
  ParamsUpdate,
  UpdateCategoryUsecase,
} from "@/modules/backend/domain/usecases/category";
import { CategoryRepository } from "@/modules/backend/data/repositories";
import { Category } from "@/modules/backend/domain/entities";
import { CategoryValidation } from "@/modules/backend/data/validations";

export class UpdateCategoryService implements UpdateCategoryUsecase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly categoryValidation: CategoryValidation
  ) {}

  update = async (id: string, data: ParamsUpdate): Promise<Category> => {
    this.categoryValidation.isMissing(data);
    this.categoryValidation.isValid(id);
    await this.categoryValidation.isRegistered(id);
    await this.categoryValidation.isDuplicated(data.name, id);

    return await this.categoryRepository.update(id, data);
  };
}
