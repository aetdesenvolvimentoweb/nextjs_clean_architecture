import { GetCategoryByIdUsecase } from "@/modules/backend/domain/usecases/category";
import { GetCategoryByIdValidation } from ".";
import { Category } from "@/modules/backend/domain/entities";
import { CategoryRepository } from "@/modules/backend/data/repositories";

export class GetCategoryByIdService implements GetCategoryByIdUsecase {
  private readonly getCategoryByIdValidation: GetCategoryByIdValidation;

  constructor(private readonly categoryRepository: CategoryRepository) {
    this.getCategoryByIdValidation = new GetCategoryByIdValidation(
      categoryRepository
    );
  }

  getById = async (id: string): Promise<Category | null> => {
    this.getCategoryByIdValidation.checkMissing(id);
    await this.getCategoryByIdValidation.checkExist(id);

    return await this.categoryRepository.getById(id);
  };
}
