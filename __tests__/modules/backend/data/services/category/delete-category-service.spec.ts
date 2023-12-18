import { CategoryRepository } from "@/modules/backend/data/repositories";
import { DeleteCategoryService } from "@/modules/backend/data/services/category";
import { MockCategoryRepository } from "@/../__mocks__/modules/backend/data/repositories";
import {
  missingParamError,
  noRegisteredError,
} from "@/modules/backend/data/helpers";

interface SutResponse {
  categoryRepository: CategoryRepository;
  sut: DeleteCategoryService;
}

const makeSut = (): SutResponse => {
  const categoryRepository = new MockCategoryRepository();
  const sut = new DeleteCategoryService(categoryRepository);
  return { categoryRepository, sut };
};

describe("DeleteCategoryService", () => {
  test("should be throws if no ID is provided", async () => {
    const { sut } = makeSut();

    await expect(sut.delete("")).rejects.toThrow(missingParamError("id"));
  });
});
