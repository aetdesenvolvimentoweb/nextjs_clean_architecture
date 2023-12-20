import { AddCategoryService } from "@/modules/backend/data/services/category";
import { CategoryValidation } from "@/modules/backend/data/validations";
import { AddCategoryController } from "@/modules/backend/presentation/controllers/category";
import {
  MockCategoryRepository,
  MockIdValidator,
} from "../../../../../../__mocks__/modules/backend/data/repositories";

interface SutResponse {
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

  return { sut };
};

describe("AddCategoryController", () => {
  test("should be return 201 if category is created", async () => {
    const { sut } = makeSut();

    await expect(
      sut.handle({ body: { name: "any_category" } })
    ).resolves.toEqual({ statusCode: 201 });
  });
});
