import { AddCategoryService } from "@/modules/backend/data/services/category/add-category-service";
import { MockCategoryRepository } from "@/../__mocks__/modules/backend/data/repositories";

interface SutResponse {
  sut: AddCategoryService;
}

const makeSut = (): SutResponse => {
  const categoryRepository = new MockCategoryRepository();
  const sut = new AddCategoryService(categoryRepository);
  return { sut };
};

describe("AddCategoryService", () => {
  test("should be throw if no name is provided", async () => {
    const { sut } = makeSut();

    await expect(sut.add({ name: "" })).rejects.toThrow();
  });
  test("should be return a category with the ID property", async () => {
    const { sut } = makeSut();

    const category = await sut.add({ name: "any_category" });

    expect(category).toHaveProperty("id");
  });
});
