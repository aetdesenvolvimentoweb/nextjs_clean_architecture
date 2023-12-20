import { CategoryRepository } from "@/modules/backend/data/repositories";
import { DeleteCategoryController } from "@/modules/backend/presentation/controllers/category";
import {
  MockCategoryRepository,
  MockIdValidator,
} from "../../../../../../__mocks__/modules/backend/data/repositories";
import { CategoryValidation } from "@/modules/backend/data/validations";
import { DeleteCategoryService } from "@/modules/backend/data/services/category";
import { missingParamError } from "@/modules/backend/data/helpers";
import { serverError } from "@/modules/backend/presentation/helpers";

interface SutResponse {
  categoryRepository: CategoryRepository;
  sut: DeleteCategoryController;
}

const makeSut = (): SutResponse => {
  const categoryRepository = new MockCategoryRepository();
  const idValidator = new MockIdValidator();
  const categoryValidation = new CategoryValidation(
    categoryRepository,
    idValidator
  );
  const deleteCategoryService = new DeleteCategoryService(
    categoryRepository,
    categoryValidation
  );
  const sut = new DeleteCategoryController(deleteCategoryService);

  return { categoryRepository, sut };
};

describe("DeleteCategoryController", () => {
  test("should be return 400 if no id is provided", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({});

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.error).toBe(missingParamError("ID").message);
  });
  test("should be return 200 if category is deleted", async () => {
    const { categoryRepository, sut } = makeSut();
    jest
      .spyOn(categoryRepository, "getById")
      .mockResolvedValueOnce({ id: "any_id", name: "any_category" });

    const httpResponse = await sut.handle({ params: { id: "any_id" } });

    expect(httpResponse.statusCode).toBe(200);
  });
  test("should be return 500 if server fails", async () => {
    const { categoryRepository, sut } = makeSut();
    jest
      .spyOn(categoryRepository, "getById")
      .mockRejectedValueOnce(serverError());

    const httpResponse = await sut.handle({ params: { id: "any_id" } });

    expect(httpResponse.statusCode).toBe(500);
  });
});