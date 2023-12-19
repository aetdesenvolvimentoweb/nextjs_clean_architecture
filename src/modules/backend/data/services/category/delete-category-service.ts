import { DeleteCategoryUsecase } from "@/modules/backend/domain/usecases/category";
import { CategoryValidation } from "@/modules/backend/data/validations";
import { CategoryRepository } from "@/modules/backend/data/repositories";
import { Category } from "@/modules/backend/domain/entities";

export class DeleteCategoryService implements DeleteCategoryUsecase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly categoryValidation: CategoryValidation
  ) {}

  delete = async (id: string): Promise<Category> => {
    this.categoryValidation.isValid(id);
    await this.categoryValidation.isRegistered(id);

    return await this.categoryRepository.delete(id);
  };
}
