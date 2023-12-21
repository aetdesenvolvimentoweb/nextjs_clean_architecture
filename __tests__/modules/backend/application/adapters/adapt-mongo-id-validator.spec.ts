import { AdaptMongoIdValidator } from "@/modules/backend/application/adapters";
import { ObjectId } from "mongodb";

describe("AdaptMongoIdValidator", () => {
  test("should be return false if invalid id is provided", () => {
    const sut = new AdaptMongoIdValidator();

    expect(sut.isValid("invalid_id")).toBe(false);
  });
  test("should be return true if valid id is provided", () => {
    const sut = new AdaptMongoIdValidator();
    const valid_id = new ObjectId().toString();

    expect(sut.isValid(valid_id)).toBe(true);
  });
});
