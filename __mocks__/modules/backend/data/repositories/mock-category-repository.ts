import { CategoryRepository } from "@/modules/backend/data/repositories";
import { AddCategory, Category } from "@/modules/backend/domain/entities";

export class MockCategoryRepository implements CategoryRepository {
  add = async (data: AddCategory): Promise<Category> => {
    return { id: "any_id", ...data };
  };

  delete = async (id: string): Promise<Category> => {
    return { id: "any_id", name: "any_category" };
  };

  getAll = async (): Promise<Category[]> => {
    return [
      { id: "any_id", name: "any_category" },
      { id: "another_id", name: "another_category" },
    ];
  };

  getByName = async (name: string): Promise<Category | null> => {
    return null;
  };

  getById = async (id: string): Promise<Category | null> => {
    return null;
  };
}
