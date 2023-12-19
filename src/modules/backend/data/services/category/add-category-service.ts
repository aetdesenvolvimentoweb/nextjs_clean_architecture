import { AddCategory, Category } from "@/modules/backend/domain/entities";
import { AddCategoryUsecase } from "@/modules/backend/domain/usecases/category";
import { CategoryRepository } from "@/modules/backend/data/repositories";
import { CategoryValidation } from "@/modules/backend/data/validations";

export class AddCategoryService implements AddCategoryUsecase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly categoryValidation: CategoryValidation
  ) {}

  add = async (data: AddCategory): Promise<Category> => {
    this.categoryValidation.isMissing(data);
    await this.categoryValidation.isDuplicated(data.name);

    return await this.categoryRepository.add(data);
  };
}
