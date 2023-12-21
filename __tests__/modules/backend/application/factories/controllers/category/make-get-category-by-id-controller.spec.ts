import { makeGetCategoryByIdController } from "@/modules/backend/application/factories/controllers/category";

describe("MakeGetCategoryByIdController", () => {
  test("should be create an instance of GetCategoryByIdController", () => {
    const sut = makeGetCategoryByIdController();

    expect(sut).toHaveProperty("handle");
  });
});
