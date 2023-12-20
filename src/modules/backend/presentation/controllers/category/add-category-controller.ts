import { AddCategoryService } from "@/modules/backend/data/services/category";
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "@/modules/backend/presentation/protocols";
import { AddCategory } from "@/modules/backend/domain/entities";
import {
  createWithSuccess,
  customAppError,
} from "@/modules/backend/presentation/helpers";

export class AddCategoryController implements Controller {
  constructor(private readonly addCategoryService: AddCategoryService) {}

  handle = async (request: HttpRequest): Promise<HttpResponse> => {
    try {
      const data: AddCategory = request.body;
      await this.addCategoryService.add(data);

      return createWithSuccess();
    } catch (error: any) {
      return customAppError(error);
    }
  };
}
