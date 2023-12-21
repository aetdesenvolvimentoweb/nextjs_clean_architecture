import { GET } from "@/app/api/category/[id]/route";
import { ObjectId } from "mongodb";

describe("CategoryAPIRoute", () => {
  test("should be GET API route return 400 if no registered is provided", async () => {
    const request = new Request(new URL("http://any-url.com"), {
      method: "GET",
    });
    const any_id = new ObjectId().toString();
    const sut = await GET(request, { params: { id: any_id } });

    expect(sut.status).toBe(400);
  });
});
