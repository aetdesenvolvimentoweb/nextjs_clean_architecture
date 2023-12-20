import { AddCategoryService } from "@/modules/backend/data/services/category";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { AddCategory } from "@/modules/backend/domain/entities";
import { CustomAppError } from "@/modules/backend/domain/errors";

export class AddCategoryController implements Controller {
  constructor(private readonly addCategoryService: AddCategoryService) {}

  handle = async (request: HttpRequest): Promise<HttpResponse> => {
    try {
      const data: AddCategory = request.body;
      await this.addCategoryService.add(data);

      return { statusCode: 201 };
    } catch (error: any) {
      if (error instanceof CustomAppError) {
        return { error: error.message, statusCode: error.statusCode };
      }
      return {
        error: "Um erro inesperado aconteceu.",
        statusCode: 500,
      };
    }
  };
}
