import { CategoryRepository } from "@/modules/backend/data/repositories";
import { CategoryInMemoryRepository } from "@/modules/backend/infra/db/in-memory/category-in-memory-repository";

interface SutResponse {
  sut: CategoryRepository;
}

const makeSut = (): SutResponse => {
  const sut = new CategoryInMemoryRepository();
  return { sut };
};

describe("CategoryInMemoryRepository", () => {
  test("should be able to add a category in memory", async () => {
    const { sut } = makeSut();

    const category = await sut.add({ name: "any_category" });

    expect(category).toHaveProperty("id");
    expect(category.name).toBe("any_category");
  });
  test("should be able to delete a category in memory", async () => {
    const { sut } = makeSut();

    const category = await sut.add({ name: "any_category" });
    const deletedCategory = await sut.delete(category.id);

    expect(deletedCategory).toEqual(category);
  });
  test("should be able return an array of category from memory", async () => {
    const { sut } = makeSut();

    await sut.add({ name: "any_category" });
    await sut.add({ name: "another_category" });

    const categories = await sut.getAll();

    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBe(2);
    expect(categories[0]).toHaveProperty("id");
    expect(categories[0]).toHaveProperty("name");
  });
  test("should be able return null that category not found by id", async () => {
    const { sut } = makeSut();

    const category = await sut.getById("no_registered_id");

    expect(category).toBeNull();
  });
  test("should be able return a category from memory by id that found", async () => {
    const { sut } = makeSut();

    const addedCategory = await sut.add({ name: "any_category" });

    const category = await sut.getById(addedCategory.id);

    expect(category).toEqual(addedCategory);
  });
  test("should be able return null that category not found by name", async () => {
    const { sut } = makeSut();

    const category = await sut.getByName("no_registered_category");

    expect(category).toBeNull();
  });
  test("should be able return a category from memory by name", async () => {
    const { sut } = makeSut();

    const addedCategory = await sut.add({ name: "any_category" });

    const category = await sut.getByName("any_category");

    expect(category).toEqual(addedCategory);
  });
  test("should be able update a category in memory", async () => {
    const { sut } = makeSut();

    const addedCategory = await sut.add({ name: "any_category" });

    const category = await sut.update(addedCategory.id, {
      name: "updated_category",
    });

    expect(category).toEqual({
      id: addedCategory.id,
      name: "updated_category",
    });
  });
});
