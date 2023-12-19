import { CategoryRepository } from "@/modules/backend/data/repositories";
import { DeleteCategoryService } from "@/modules/backend/data/services/category";
import {
  MockCategoryRepository,
  MockIdValidator,
} from "@/../__mocks__/modules/backend/data/repositories";
import {
  invalidParamError,
  missingParamError,
  noRegisteredError,
} from "@/modules/backend/data/helpers";
import { IdValidation } from "@/modules/backend/domain/validations";
import { CategoryValidation } from "@/modules/backend/data/validations";

interface SutResponse {
  categoryRepository: CategoryRepository;
  idValidator: IdValidation;
  sut: DeleteCategoryService;
}

const makeSut = (): SutResponse => {
  const categoryRepository = new MockCategoryRepository();
  const idValidator = new MockIdValidator();
  const categoryValidation = new CategoryValidation(
    categoryRepository,
    idValidator
  );
  const sut = new DeleteCategoryService(categoryRepository, categoryValidation);
  return { categoryRepository, idValidator, sut };
};

describe("DeleteCategoryService", () => {
  test("should be throws if no ID is provided", async () => {
    const { sut } = makeSut();

    await expect(sut.delete("")).rejects.toThrow(missingParamError("ID"));
  });
  test("should be throws if invalid ID is provided", async () => {
    const { idValidator, sut } = makeSut();
    jest
      .spyOn(idValidator, "isValid")
      .mockImplementationOnce((id: string) => false);

    await expect(sut.delete("invalid_id")).rejects.toThrow(
      invalidParamError("ID")
    );
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
