import { GetCategoryByIdService } from "@/modules/backend/data/services/category";
import { MockCategoryRepository } from "@/../__mocks__/modules/backend/data/repositories";
import { CategoryRepository } from "@/modules/backend/data/repositories";
import {
  missingParamError,
  noRegisteredError,
} from "@/modules/backend/data/helpers";

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
  test("should be throws if no ID is provided", async () => {
    const { sut } = makeSut();

    await expect(sut.getById("")).rejects.toThrow(missingParamError("id"));
  });
  test("should be throws if no registered ID is provided", async () => {
    const { sut } = makeSut();

    await expect(sut.getById("no_registered_id")).rejects.toThrow(
      noRegisteredError("categoria")
    );
  });
  test("should be return a category if a registered ID is provided", async () => {
    const { categoryRepository, sut } = makeSut();
    jest
      .spyOn(categoryRepository, "getById")
      .mockResolvedValue({ id: "any_id", name: "any_category" });

    await expect(sut.getById("any_id")).resolves.not.toThrow();
  });
});
