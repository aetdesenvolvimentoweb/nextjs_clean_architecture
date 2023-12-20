import { CategoryRepository } from "@/modules/backend/data/repositories";
import { AddCategory, Category } from "@/modules/backend/domain/entities";
import { ParamsUpdate } from "@/modules/backend/domain/usecases/category";
import { ObjectId } from "mongodb";

export class CategoryInMemoryRepository implements CategoryRepository {
  private categories: Category[] = [];

  add = async (data: AddCategory): Promise<Category> => {
    const category = { id: new ObjectId().toString(), ...data };
    this.categories.push(category);
    return category;
  };
  delete = async (id: string): Promise<Category> => {
    const index = this.categories.findIndex((category) => category.id === id);
    const category = this.categories[index];
    this.categories = this.categories.splice(index, 1);
    return category;
  };
  getAll = async (): Promise<Category[]> => {
    return this.categories;
  };
  getById = async (id: string): Promise<Category | null> => {
    return this.categories.find((category) => category.id === id) || null;
  };
  getByName = async (name: string): Promise<Category | null> => {
    return this.categories.find((category) => category.name === name) || null;
  };
  update = async (id: string, data: ParamsUpdate): Promise<Category> => {
    const index = this.categories.findIndex((category) => category.id === id);
    this.categories[index] = { ...this.categories[index], ...data };
    return this.categories[index];
  };
}
