import { UpdateCategoryService } from "@/modules/backend/data/services/category";
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "@/modules/backend/presentation/protocols";
import { ParamsUpdate } from "@/modules/backend/domain/usecases/category";
import { customAppError } from "@/modules/backend/presentation/helpers";

export class UpdateCategoryController implements Controller {
  constructor(private readonly updateCategoryService: UpdateCategoryService) {}

  handle = async (request: HttpRequest): Promise<HttpResponse> => {
    try {
      const id: string = request.params?.id || "";
      const data: ParamsUpdate = request.body;
      await this.updateCategoryService.update(id, data);

      return { statusCode: 200 };
    } catch (error: any) {
      return customAppError(error);
    }
  };
}
