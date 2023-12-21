import { adaptNextjsRoute } from "@/modules/backend/application/adapters";
import { makeAddCategoryController } from "@/modules/backend/application/factories/controllers/category";

describe("AdaptNextjsRoute", () => {
  test("should be return 400 if AddCategoryController is provided without body", async () => {
    const request = new Request(new URL("http://any_url.com"), {
      method: "POST",
    });
    const sut = await adaptNextjsRoute(makeAddCategoryController(), request);

    expect(sut.status).toBe(400);
  });
  test("should be return 201 if AddCategoryController and correct data is provided", async () => {
    const request = new Request(new URL("http://any_url.com"), {
      method: "POST",
      body: JSON.stringify({ name: "any_category" }),
    });
    const sut = await adaptNextjsRoute(makeAddCategoryController(), request);

    expect(sut.status).toBe(201);
  });
});
