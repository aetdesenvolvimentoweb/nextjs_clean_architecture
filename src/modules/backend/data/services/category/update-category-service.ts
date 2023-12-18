import {
  ParamsUpdate,
  UpdateCategoryUsecase,
} from "@/modules/backend/domain/usecases/category";
import { CategoryRepository } from "../../repositories";
import { Category } from "@/modules/backend/domain/entities";
import { UpdateCategoryValidation } from ".";

export class UpdateCategoryService implements UpdateCategoryUsecase {
  private readonly updateCategoryValidation: UpdateCategoryValidation;

  constructor(private readonly categoryRepository: CategoryRepository) {
    this.updateCategoryValidation = new UpdateCategoryValidation(
      categoryRepository
    );
  }

  update = async (id: string, data: ParamsUpdate): Promise<Category> => {
    this.updateCategoryValidation.checkMissing({ id, ...data });
    await this.updateCategoryValidation.checkExist(id);

    return await this.categoryRepository.update(id, data);
  };
}
