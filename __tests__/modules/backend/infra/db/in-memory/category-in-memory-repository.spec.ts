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
  test("should be able of add a category in memory", async () => {
    const { sut } = makeSut();

    const category = await sut.add({ name: "any_category" });

    expect(category).toHaveProperty("id");
    expect(category.name).toBe("any_category");
  });
});
