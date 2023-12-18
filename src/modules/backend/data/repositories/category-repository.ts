import { AddCategory, Category } from "@/modules/backend/domain/entities";
import { ParamsUpdate } from "../../domain/usecases/category";

export interface CategoryRepository {
  add: (data: AddCategory) => Promise<Category>;
  delete: (id: string) => Promise<Category>;
  getAll: () => Promise<Category[]>;
  getById: (id: string) => Promise<Category | null>;
  getByName: (name: string) => Promise<Category | null>;
  update: (id: string, data: ParamsUpdate) => Promise<Category>;
}
