import { POST } from "@/app/api/category/route";

describe("CategoryAPIRoute", () => {
  test("should be POST API route return 201 if correct data is provided", async () => {
    const request = new Request(new URL("http://any-url.com"), {
      method: "POST",
      body: JSON.stringify({ name: "any_category" }),
    });
    const sut = await POST(request);

    expect(sut.status).toBe(201);
  });
});
