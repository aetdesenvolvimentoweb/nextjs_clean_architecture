import { GetCategoryByIdUsecase } from "@/modules/backend/domain/usecases/category";
import { CategoryValidation } from "@/modules/backend/data/validations";
import { Category } from "@/modules/backend/domain/entities";
import { CategoryRepository } from "@/modules/backend/data/repositories";

export class GetCategoryByIdService implements GetCategoryByIdUsecase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly categoryValidation: CategoryValidation
  ) {}

  getById = async (id: string): Promise<Category | null> => {
    this.categoryValidation.isValid(id);
    await this.categoryValidation.isRegistered(id);

    return await this.categoryRepository.getById(id);
  };
}
