import { makeUpdateCategoryController } from "@/modules/backend/application/factories/controllers/category";

describe("MakeUpdateCategoryController", () => {
  test("should be create an instance of UpdateCategoryController", () => {
    const sut = makeUpdateCategoryController();

    expect(sut).toHaveProperty("handle");
  });
});
