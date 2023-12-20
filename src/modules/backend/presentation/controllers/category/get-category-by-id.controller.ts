import { GetCategoryByIdService } from "@/modules/backend/data/services/category";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { customAppError } from "../../helpers";

export class GetCategoryByIdController implements Controller {
  constructor(
    private readonly getCategoryByIdService: GetCategoryByIdService
  ) {}

  handle = async (request: HttpRequest): Promise<HttpResponse> => {
    try {
      const id: string = request.params?.id || "";
      const category = await this.getCategoryByIdService.getById(id);

      return { data: category, statusCode: 200 };
    } catch (error: any) {
      return customAppError(error);
    }
  };
}
