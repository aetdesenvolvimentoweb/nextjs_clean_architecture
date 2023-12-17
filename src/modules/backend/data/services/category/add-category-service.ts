import { AddCategory, Category } from "@/modules/backend/domain/entities";
import { AddCategoryUseCase } from "@/modules/backend/domain/usecases/category";
import { CategoryRepository } from "@/modules/backend/data/repositories";
import { AddCategoryDataValidation } from ".";

export class AddCategoryService implements AddCategoryUseCase {
  private readonly addCategoryDataValidation: AddCategoryDataValidation;

  constructor(private readonly categoryRepository: CategoryRepository) {
    this.addCategoryDataValidation = new AddCategoryDataValidation(
      categoryRepository
    );
  }

  add = async (data: AddCategory): Promise<Category> => {
    this.addCategoryDataValidation.checkMissing(data);
    await this.addCategoryDataValidation.checkDuplicated(data.name);

    return await this.categoryRepository.add(data);
  };
}
