import { adaptNextjsRoute } from "@/modules/backend/application/adapters";
import {
  makeAddCategoryController,
  makeGetAllCategoriesController,
} from "@/modules/backend/application/factories/controllers/category";
import { NextResponse } from "next/server";

export const POST = async (request: Request): Promise<NextResponse> => {
  return await adaptNextjsRoute(makeAddCategoryController(), request);
};

export const GET = async (request: Request): Promise<NextResponse> => {
  return await adaptNextjsRoute(makeGetAllCategoriesController(), request);
};
