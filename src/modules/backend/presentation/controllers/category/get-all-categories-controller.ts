import { GetAllCategoriesService } from "@/modules/backend/data/services/category";
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "@/modules/backend/presentation/protocols";
import { customAppError } from "@/modules/backend/presentation/helpers";

export class GetAllCategoriesController implements Controller {
  constructor(
    private readonly getAllCategoriesService: GetAllCategoriesService
  ) {}

  handle = async (_: HttpRequest): Promise<HttpResponse> => {
    try {
      const categories = await this.getAllCategoriesService.getAll();

      return { data: categories, statusCode: 200 };
    } catch (error: any) {
      return customAppError(error);
    }
  };
}
