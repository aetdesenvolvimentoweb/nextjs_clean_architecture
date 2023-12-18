import { DeleteCategoryUsecase } from "@/modules/backend/domain/usecases/category";
import { DeleteCategoryValidation } from ".";
import { CategoryRepository } from "../../repositories";
import { Category } from "@/modules/backend/domain/entities";

export class DeleteCategoryService implements DeleteCategoryUsecase {
  private readonly deleteCategoryValidation: DeleteCategoryValidation;

  constructor(private readonly categoryRepository: CategoryRepository) {
    this.deleteCategoryValidation = new DeleteCategoryValidation(
      categoryRepository
    );
  }

  delete = async (id: string): Promise<Category> => {
    this.deleteCategoryValidation.checkMissing(id);
    await this.deleteCategoryValidation.checkExist(id);

    return await this.categoryRepository.delete(id);
  };
}
