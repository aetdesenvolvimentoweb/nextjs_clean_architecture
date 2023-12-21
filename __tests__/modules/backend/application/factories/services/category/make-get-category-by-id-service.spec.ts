import { makeGetCategoryByIdService } from "@/modules/backend/application/factories/services/category";

describe("MakeGetCategoryByIdService", () => {
  test("should be create an instance of GetCategoryByIdService", () => {
    const sut = makeGetCategoryByIdService();

    expect(sut).toHaveProperty("getById");
  });
});
