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
  test("should be throws if no registered ID is provided", async () => {
    const { sut } = makeSut();

    await expect(sut.delete("no_registered_id")).rejects.toThrow(
      noRegisteredError("categoria")
    );
  });
  test("should be returns the deleted category if correct data is provided", async () => {
    const { categoryRepository, sut } = makeSut();
    jest
      .spyOn(categoryRepository, "getById")
      .mockResolvedValue({ id: "any_id", name: "any_category" });

    await expect(sut.delete("any_id")).resolves.not.toThrow();
  });
});
