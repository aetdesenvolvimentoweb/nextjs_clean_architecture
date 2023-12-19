import { GetCategoryByIdService } from "@/modules/backend/data/services/category";
import { CategoryValidation } from "@/modules/backend/data/validations";
import {
  MockCategoryRepository,
  MockIdValidator,
} from "@/../__mocks__/modules/backend/data/repositories";
import { CategoryRepository } from "@/modules/backend/data/repositories";
import {
  invalidParamError,
  missingParamError,
  noRegisteredError,
} from "@/modules/backend/data/helpers";
import { IdValidation } from "@/modules/backend/domain/validations";

interface SutResponse {
  categoryRepository: CategoryRepository;
  idValidator: IdValidation;
  sut: GetCategoryByIdService;
}

const makeSut = (): SutResponse => {
  const categoryRepository = new MockCategoryRepository();
  const idValidator = new MockIdValidator();
  const categoryValidation = new CategoryValidation(
    categoryRepository,
    idValidator
  );
  const sut = new GetCategoryByIdService(
    categoryRepository,
    categoryValidation
  );
  return { categoryRepository, idValidator, sut };
};

describe("GetCategoryByIdService", () => {
  test("should be throws if no ID is provided", async () => {
    const { sut } = makeSut();

    await expect(sut.getById("")).rejects.toThrow(missingParamError("ID"));
  });
  test("should be throws if invalid ID is provided", async () => {
    const { idValidator, sut } = makeSut();
    jest
      .spyOn(idValidator, "isValid")
      .mockImplementationOnce((id: string) => false);

    await expect(sut.getById("invalid_id")).rejects.toThrow(
      invalidParamError("ID")
    );
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
