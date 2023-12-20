import { CategoryRepository } from "@/modules/backend/data/repositories";
import { UpdateCategoryService } from "@/modules/backend/data/services/category/update-category-service";
import {
  MockCategoryRepository,
  MockIdValidator,
} from "@/../__mocks__/modules/backend/data/repositories";
import {
  duplicatedKeyError,
  invalidParamError,
  missingParamError,
  noRegisteredError,
} from "@/modules/backend/data/helpers";
import { IdValidation } from "@/modules/backend/domain/validations";
import { CategoryValidation } from "@/modules/backend/data/validations";

interface SutResponse {
  categoryRepository: CategoryRepository;
  idValidator: IdValidation;
  sut: UpdateCategoryService;
}

const makeSut = (): SutResponse => {
  const categoryRepository = new MockCategoryRepository();
  const idValidator = new MockIdValidator();
  const categoryValidation = new CategoryValidation(
    categoryRepository,
    idValidator
  );
  const sut = new UpdateCategoryService(categoryRepository, categoryValidation);
  return { categoryRepository, idValidator, sut };
};

describe("UpdateCategoryService", () => {
  test("should be throws if no id is provided", async () => {
    const { sut } = makeSut();

    await expect(
      sut.update("", {
        name: "updated_category",
      })
    ).rejects.toThrow(missingParamError("ID"));
  });
  test("should be throws if invalid id is provided", async () => {
    const { sut } = makeSut();

    await expect(
      sut.update("invalid_id", {
        name: "updated_category",
      })
    ).rejects.toThrow(invalidParamError("ID"));
  });
  test("should be throws no registered id is provided", async () => {
    const { idValidator, sut } = makeSut();
    jest
      .spyOn(idValidator, "isValid")
      .mockImplementationOnce((id: string) => true);

    await expect(
      sut.update("invalid_id", {
        name: "updated_category",
      })
    ).rejects.toThrow(noRegisteredError("categoria"));
  });
  test("should be throws if no name is provided", async () => {
    const { sut } = makeSut();

    await expect(
      sut.update("any_id", {
        name: "",
      })
    ).rejects.toThrow(missingParamError("nome"));
  });
  test("should be throws if no registered id is provided", async () => {
    const { idValidator, sut } = makeSut();
    jest
      .spyOn(idValidator, "isValid")
      .mockImplementationOnce((id: string) => true);

    await expect(
      sut.update("no_registered_id", {
        name: "updated_category",
      })
    ).rejects.toThrow(noRegisteredError("categoria"));
  });
  test("should be throws if duplicated name is provided", async () => {
    const { categoryRepository, idValidator, sut } = makeSut();
    jest
      .spyOn(idValidator, "isValid")
      .mockImplementationOnce((id: string) => true);
    jest
      .spyOn(categoryRepository, "getById")
      .mockResolvedValueOnce({ id: "another_id", name: "any_category" });
    jest
      .spyOn(categoryRepository, "getByName")
      .mockResolvedValueOnce({ id: "another_id", name: "duplicated_category" });

    await expect(
      sut.update("valid_id", { name: "duplicated_category" })
    ).rejects.toThrow(duplicatedKeyError("nome"));
  });
  test("should be return a updated category if correct data is provided", async () => {
    const { categoryRepository, idValidator, sut } = makeSut();
    jest
      .spyOn(idValidator, "isValid")
      .mockImplementationOnce((id: string) => true);
    jest
      .spyOn(categoryRepository, "getById")
      .mockResolvedValueOnce({ id: "valid_id", name: "updated_category" });
    jest
      .spyOn(categoryRepository, "getByName")
      .mockResolvedValueOnce({ id: "valid_id", name: "updated_category" });

    await expect(
      sut.update("valid_id", { name: "updated_category" })
    ).resolves.not.toThrow();
  });
});
