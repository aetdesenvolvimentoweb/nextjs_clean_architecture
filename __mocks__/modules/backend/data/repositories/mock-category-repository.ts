import { CategoryRepository } from "@/modules/backend/data/repositories";
import { AddCategory, Category } from "@/modules/backend/domain/entities";

export class MockCategoryRepository implements CategoryRepository {
  add = async (data: AddCategory): Promise<Category> => {
    return { id: "any_id", ...data };
  };

  getByName = async (name: string): Promise<Category | null> => {
    return null;
  };

  getById = async (id: string): Promise<Category | null> => {
    return { id: "any_id", name: "any_category" };
  };
}
