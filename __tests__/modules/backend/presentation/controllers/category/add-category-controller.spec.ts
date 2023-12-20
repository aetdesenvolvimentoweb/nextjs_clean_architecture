import { AddCategoryService } from "@/modules/backend/data/services/category";
import { CategoryValidation } from "@/modules/backend/data/validations";
import { AddCategoryController } from "@/modules/backend/presentation/controllers/category";
import {
  MockCategoryRepository,
  MockIdValidator,
} from "@/../__mocks__/modules/backend/data/repositories";
import { missingParamError } from "@/modules/backend/data/helpers";
import { CategoryRepository } from "@/modules/backend/data/repositories";
import { serverError } from "@/modules/backend/presentation/helpers";

interface SutResponse {
  categoryRepository: CategoryRepository;
  sut: AddCategoryController;
}

const makeSut = (): SutResponse => {
  const categoryRepository = new MockCategoryRepository();
  const idValidator = new MockIdValidator();
  const categoryValidation = new CategoryValidation(
    categoryRepository,
    idValidator
  );
  const addCategoryService = new AddCategoryService(
    categoryRepository,
    categoryValidation
  );
  const sut = new AddCategoryController(addCategoryService);

  return { categoryRepository, sut };
};

describe("AddCategoryController", () => {
  test("should be return 400 if no name is provided", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({ body: { name: "" } });

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.error).toBe(missingParamError("nome").message);
  });
  test("should be return 201 if category is created", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({ body: { name: "any_category" } });

    expect(httpResponse.statusCode).toBe(201);
  });
  test("should be return 500 if server fails", async () => {
    const { categoryRepository, sut } = makeSut();
    jest.spyOn(categoryRepository, "add").mockRejectedValueOnce(serverError());

    const httpResponse = await sut.handle({ body: { name: "any_category" } });
    expect(httpResponse.statusCode).toBe(500);
  });
});
