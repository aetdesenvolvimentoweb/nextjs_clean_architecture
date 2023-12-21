import { makeUpdateCategoryService } from "@/modules/backend/application/factories/services/category";

describe("MakeUpdateCategoryService", () => {
  test("should be create an instance of UpdateCategoryService", () => {
    const sut = makeUpdateCategoryService();

    expect(sut).toHaveProperty("update");
  });
});
