import { makeDeleteCategoryController } from "@/modules/backend/application/factories/controllers/category";

describe("MakeDeleteCategoryController", () => {
  test("should be create an instance of DeleteCategoryController", () => {
    const sut = makeDeleteCategoryController();

    expect(sut).toHaveProperty("handle");
  });
});
