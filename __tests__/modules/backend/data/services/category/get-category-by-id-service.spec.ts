import { GetCategoryByIdService } from "@/modules/backend/data/services/category";
import { MockCategoryRepository } from "@/../__mocks__/modules/backend/data/repositories";
import { CategoryRepository } from "@/modules/backend/data/repositories";

interface SutResponse {
  categoryRepository: CategoryRepository;
  sut: GetCategoryByIdService;
}

const makeSut = (): SutResponse => {
  const categoryRepository = new MockCategoryRepository();
  const sut = new GetCategoryByIdService(categoryRepository);
  return { categoryRepository, sut };
};

describe("GetCategoryByIdService", () => {
  test("should be return a category if a registered ID is provided", async () => {
    const { sut } = makeSut();

    await expect(sut.getById("another_id")).resolves.not.toThrow();
  });
});
