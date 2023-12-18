import { CategoryRepository } from "@/modules/backend/data/repositories";
import { UpdateCategoryService } from "@/modules/backend/data/services/category/update-category-service";
import { MockCategoryRepository } from "@/../__mocks__/modules/backend/data/repositories";

interface SutResponse {
  categoryRepository: CategoryRepository;
  sut: UpdateCategoryService;
}

const makeSut = (): SutResponse => {
  const categoryRepository = new MockCategoryRepository();
  const sut = new UpdateCategoryService(categoryRepository);
  return { categoryRepository, sut };
};

describe("UpdateCategoryService", () => {
  test("should be return a updated category if correct data is provided", async () => {
    const { categoryRepository, sut } = makeSut();
    jest.spyOn(categoryRepository, "getById").mockResolvedValueOnce({
      id: "any_id",
      name: "any_category",
    });

    const updatedCategory = await sut.update("any_id", {
      name: "updated_category",
    });

    expect(updatedCategory).toEqual({
      id: "any_id",
      name: "updated_category",
    });
  });
});
