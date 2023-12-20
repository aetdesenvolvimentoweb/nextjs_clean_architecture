import { CategoryRepository } from "@/modules/backend/data/repositories";
import { GetCategoryByIdController } from "@/modules/backend/presentation/controllers/category";
import {
  MockCategoryRepository,
  MockIdValidator,
} from "@/../__mocks__/modules/backend/data/repositories";
import { CategoryValidation } from "@/modules/backend/data/validations";
import { GetCategoryByIdService } from "@/modules/backend/data/services/category";
import {
  invalidParamError,
  missingParamError,
  noRegisteredError,
} from "@/modules/backend/data/helpers";
import { serverError } from "@/modules/backend/presentation/helpers";
import { IdValidation } from "@/modules/backend/domain/validations";

interface SutResponse {
  categoryRepository: CategoryRepository;
  idValidator: IdValidation;
  sut: GetCategoryByIdController;
}

const makeSut = (): SutResponse => {
  const categoryRepository = new MockCategoryRepository();
  const idValidator = new MockIdValidator();
  const categoryValidation = new CategoryValidation(
    categoryRepository,
    idValidator
  );
  const getCategoryByIdService = new GetCategoryByIdService(
    categoryRepository,
    categoryValidation
  );
  const sut = new GetCategoryByIdController(getCategoryByIdService);

  return { categoryRepository, idValidator, sut };
};

describe("GetCategoryByIdController", () => {
  test("should be return 400 if no id is provided", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({});

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.error).toBe(missingParamError("ID").message);
  });
  test("should be return 400 if invalid id is provided", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({ params: { id: "invalid_id" } });

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.error).toBe(invalidParamError("ID").message);
  });
  test("should be return 400 if no registered id is provided", async () => {
    const { idValidator, sut } = makeSut();
    jest
      .spyOn(idValidator, "isValid")
      .mockImplementationOnce((id: string) => true);

    const httpResponse = await sut.handle({ params: { id: "invalid_id" } });

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.error).toBe(noRegisteredError("categoria").message);
  });
  test("should be return 200 if category is found", async () => {
    const { categoryRepository, idValidator, sut } = makeSut();
    jest
      .spyOn(idValidator, "isValid")
      .mockImplementationOnce((id: string) => true);
    jest
      .spyOn(categoryRepository, "getById")
      .mockResolvedValueOnce({ id: "valid_id", name: "any_category" });

    const httpResponse = await sut.handle({ params: { id: "valid_id" } });

    expect(httpResponse.statusCode).toBe(200);
  });
  test("should be return 500 if server fails", async () => {
    const { categoryRepository, idValidator, sut } = makeSut();
    jest
      .spyOn(idValidator, "isValid")
      .mockImplementationOnce((id: string) => true);
    jest
      .spyOn(categoryRepository, "getById")
      .mockRejectedValueOnce(serverError());

    const httpResponse = await sut.handle({ params: { id: "any_id" } });

    expect(httpResponse.statusCode).toBe(500);
  });
});
