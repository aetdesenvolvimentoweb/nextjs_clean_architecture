import { CategoryRepository } from "@/modules/backend/data/repositories";
import { GetAllCategoriesService } from "@/modules/backend/data/services/category";
import { MockCategoryRepository } from "@/../__mocks__/modules/backend/data/repositories";

interface SutResponse {
  categoryRepository: CategoryRepository;
  sut: GetAllCategoriesService;
}

const makeSut = (): SutResponse => {
  const categoryRepository = new MockCategoryRepository();
  const sut = new GetAllCategoriesService(categoryRepository);
  return { categoryRepository, sut };
};

describe("GetAllCategoriesService", () => {
  test("should be return an array of categories if that found", async () => {
    const { sut } = makeSut();

    const categories = await sut.getAll();

    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
    expect(categories[0]).toHaveProperty("id");
    expect(categories[0]).toHaveProperty("name");
  });
  test("should be return an empty array if not that found categories", async () => {
    const { categoryRepository, sut } = makeSut();
    jest.spyOn(categoryRepository, "getAll").mockResolvedValueOnce([]);

    const categories = await sut.getAll();

    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBe(0);
  });
});
