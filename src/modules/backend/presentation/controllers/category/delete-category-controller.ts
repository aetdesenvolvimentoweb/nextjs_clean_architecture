import { DeleteCategoryService } from "@/modules/backend/data/services/category";
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "@/modules/backend/presentation/protocols";
import { customAppError } from "@/modules/backend/presentation/helpers";

export class DeleteCategoryController implements Controller {
  constructor(private readonly deleteCategoryService: DeleteCategoryService) {}

  handle = async (request: HttpRequest): Promise<HttpResponse> => {
    try {
      const id: string = request.params?.id || "";
      await this.deleteCategoryService.delete(id);

      return { statusCode: 200 };
    } catch (error: any) {
      return customAppError(error);
    }
  };
}
