import { AddCategoryService } from "@/modules/backend/data/services/category/add-category-service";
import { MockCategoryRepository } from "@/../__mocks__/modules/backend/data/repositories";
import { CategoryRepository } from "@/modules/backend/data/repositories";
import {
  duplicatedKeyError,
  missingParamError,
} from "@/modules/backend/data/helpers";

interface SutResponse {
  categoryRepository: CategoryRepository;
  sut: AddCategoryService;
}

const makeSut = (): SutResponse => {
  const categoryRepository = new MockCategoryRepository();
  const sut = new AddCategoryService(categoryRepository);
  return { categoryRepository, sut };
};

describe("AddCategoryService", () => {
  test("should be throws if no name is provided", async () => {
    const { sut } = makeSut();

    await expect(sut.add({ name: "" })).rejects.toThrow(
      missingParamError("nome")
    );
  });
  test("should be throws if duplicated name is provided", async () => {
    const { categoryRepository, sut } = makeSut();
    jest
      .spyOn(categoryRepository, "getByName")
      .mockResolvedValueOnce({ id: "any_id", name: "duplicated_category" });

    await expect(sut.add({ name: "duplicated_category" })).rejects.toThrow(
      duplicatedKeyError("nome")
    );
  });
  test("should be return a category with the ID property", async () => {
    const { sut } = makeSut();

    const category = await sut.add({ name: "any_category" });

    expect(category).toHaveProperty("id");
  });
});
