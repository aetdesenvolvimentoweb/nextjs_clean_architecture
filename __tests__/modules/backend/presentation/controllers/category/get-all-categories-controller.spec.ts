import { CategoryRepository } from "@/modules/backend/data/repositories";
import { GetAllCategoriesController } from "@/modules/backend/presentation/controllers/category";
import {
  MockCategoryRepository,
  MockIdValidator,
} from "../../../../../../__mocks__/modules/backend/data/repositories";
import { CategoryValidation } from "@/modules/backend/data/validations";
import { GetAllCategoriesService } from "@/modules/backend/data/services/category";

interface SutResponse {
  categoryRepository: CategoryRepository;
  sut: GetAllCategoriesController;
}

const makeSut = (): SutResponse => {
  const categoryRepository = new MockCategoryRepository();
  const getAllCategoriesService = new GetAllCategoriesService(
    categoryRepository
  );
  const sut = new GetAllCategoriesController(getAllCategoriesService);

  return { categoryRepository, sut };
};

describe("GetAllCategoriesController", () => {
  test("should be return 200 if an array of categories is found", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({});

    expect(httpResponse.statusCode).toBe(200);
    expect(Array.isArray(httpResponse.data)).toBe(true);
    expect(httpResponse.data[0]).toHaveProperty("id");
    expect(httpResponse.data[0]).toHaveProperty("name");
  });
});
