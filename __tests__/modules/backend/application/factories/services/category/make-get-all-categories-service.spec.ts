import { makeGetAllCategoriesService } from "@/modules/backend/application/factories/services/category";

describe("MakeGetAllCategoriesService", () => {
  test("should be create an instance of GetAllCategoriesService", () => {
    const sut = makeGetAllCategoriesService();

    expect(sut).toHaveProperty("getAll");
  });
});
