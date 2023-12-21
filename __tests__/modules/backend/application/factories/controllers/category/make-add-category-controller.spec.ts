import { makeAddCategoryController } from "@/modules/backend/application/factories/controllers/category";

describe("MakeAddMilitaryRankController", () => {
  test("should be create an instance of AddCategoryController", () => {
    const sut = makeAddCategoryController();

    expect(sut).toHaveProperty("handle");
  });
});
