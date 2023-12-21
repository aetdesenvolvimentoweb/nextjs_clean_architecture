import { makeGetAllCategoriesController } from "@/modules/backend/application/factories/controllers/category";

describe("MakeGetAllCategoriesController", () => {
  test("should be create an instance of GetAllCategoriesController", () => {
    const sut = makeGetAllCategoriesController();

    expect(sut).toHaveProperty("handle");
  });
});
