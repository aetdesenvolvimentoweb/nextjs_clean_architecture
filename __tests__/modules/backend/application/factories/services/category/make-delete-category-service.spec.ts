import { makeDeleteCategoryService } from "@/modules/backend/application/factories/services/category";

describe("MakeDeleteCategoryService", () => {
  test("should be create an instance of DeleteCategoryService", () => {
    const sut = makeDeleteCategoryService();

    expect(sut).toHaveProperty("delete");
  });
});
