import { AddCategoryService } from "@/modules/backend/data/services/category";
import { CategoryValidation } from "@/modules/backend/data/validations";
import { AddCategoryController } from "@/modules/backend/presentation/controllers/category";
import {
  MockCategoryRepository,
  MockIdValidator,
} from "@/../__mocks__/modules/backend/data/repositories";
import { missingParamError } from "@/modules/backend/data/helpers";
import { CategoryRepository } from "@/modules/backend/data/repositories";
import {
  clientError,
  createWithSuccess,
  serverError,
} from "@/modules/backend/presentation/helpers";

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

    await expect(sut.handle({ body: { name: "" } })).resolves.toEqual(
      clientError(missingParamError("nome"))
    );
  });
  test("should be return 201 if category is created", async () => {
    const { sut } = makeSut();

    await expect(
      sut.handle({ body: { name: "any_category" } })
    ).resolves.toEqual(createWithSuccess());
  });
  test("should be return 500 if server fails", async () => {
    const { categoryRepository, sut } = makeSut();
    jest.spyOn(categoryRepository, "add").mockRejectedValueOnce(serverError());

    await expect(
      sut.handle({ body: { name: "any_category" } })
    ).resolves.toEqual(serverError());
  });
});
