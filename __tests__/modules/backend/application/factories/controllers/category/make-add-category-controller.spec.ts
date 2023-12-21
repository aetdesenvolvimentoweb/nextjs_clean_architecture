import { makeAddCategoryController } from "@/modules/backend/application/factories/controllers/category";

describe("MakeAddCategoryController", () => {
  test("should be create an instance of AddCategoryController", () => {
    const sut = makeAddCategoryController();

    expect(sut).toHaveProperty("handle");
  });
});
