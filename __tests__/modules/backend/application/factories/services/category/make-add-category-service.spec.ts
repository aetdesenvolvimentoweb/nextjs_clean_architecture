import { makeAddCategoryService } from "@/modules/backend/application/factories/services/category";

describe("MakeAddCategoryService", () => {
  test("should be create an instance of AddCategoryService", () => {
    const sut = makeAddCategoryService();

    expect(sut).toHaveProperty("add");
  });
});
