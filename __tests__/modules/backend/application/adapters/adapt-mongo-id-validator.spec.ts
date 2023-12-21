import { AdaptMongoIdValidator } from "@/modules/backend/application/adapters";

describe("AdaptMongoIdValidator", () => {
  test("should be return false if invalid id is provided", () => {
    const sut = new AdaptMongoIdValidator();

    expect(sut.isValid("invalid_id")).toBe(false);
  });
});
