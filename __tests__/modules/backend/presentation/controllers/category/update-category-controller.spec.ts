import { CategoryRepository } from "@/modules/backend/data/repositories";
import { UpdateCategoryController } from "@/modules/backend/presentation/controllers/category";
import {
  MockCategoryRepository,
  MockIdValidator,
} from "@/../__mocks__/modules/backend/data/repositories";
import { CategoryValidation } from "@/modules/backend/data/validations";
import { UpdateCategoryService } from "@/modules/backend/data/services/category";
import { missingParamError } from "@/modules/backend/data/helpers";
import { serverError } from "@/modules/backend/presentation/helpers";

interface SutResponse {
  categoryRepository: CategoryRepository;
  sut: UpdateCategoryController;
}

const makeSut = (): SutResponse => {
  const categoryRepository = new MockCategoryRepository();
  const idValidator = new MockIdValidator();
  const categoryValidation = new CategoryValidation(
    categoryRepository,
    idValidator
  );
  const updateCategoryService = new UpdateCategoryService(
    categoryRepository,
    categoryValidation
  );
  const sut = new UpdateCategoryController(updateCategoryService);

  return { categoryRepository, sut };
};

describe("UpdateCategoryController", () => {
  test("should be return 400 if no id is provided", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({
      params: { id: "" },
      body: { name: "any_category" },
    });

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.error).toBe(missingParamError("ID").message);
  });
  test("should be return 200 if category is updated", async () => {
    const { categoryRepository, sut } = makeSut();
    jest
      .spyOn(categoryRepository, "getById")
      .mockResolvedValueOnce({ id: "any_id", name: "any_category" });
    jest
      .spyOn(categoryRepository, "getByName")
      .mockResolvedValueOnce({ id: "any_id", name: "updated_category" });

    const httpResponse = await sut.handle({
      params: { id: "any_id" },
      body: { name: "updated_category" },
    });

    expect(httpResponse.statusCode).toBe(200);
  });
});
