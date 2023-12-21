import { adaptNextjsRoute } from "@/modules/backend/application/adapters";
import { makeAddCategoryController } from "@/modules/backend/application/factories/controllers/category";

describe("AdaptNextjsRoute", () => {
  test("should be return 400 if incorrect data is provided", async () => {
    const sut = await adaptNextjsRoute(makeAddCategoryController(), {
      body: {},
    });

    expect(sut.status).toBe(400);
  });
  test("should be return 201 if category was created", async () => {
    const sut = await adaptNextjsRoute(makeAddCategoryController(), {
      body: { name: "any_category" },
    });

    expect(sut.status).toBe(201);
  });
});
