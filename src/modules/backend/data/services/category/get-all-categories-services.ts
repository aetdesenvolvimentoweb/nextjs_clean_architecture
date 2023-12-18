import { GetAllCategoriesUsecase } from "@/modules/backend/domain/usecases/category";
import { CategoryRepository } from "../../repositories";
import { Category } from "@/modules/backend/domain/entities";

export class GetAllCategoriesService implements GetAllCategoriesUsecase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  getAll = async (): Promise<Category[]> => {
    return this.categoryRepository.getAll();
  };
}
