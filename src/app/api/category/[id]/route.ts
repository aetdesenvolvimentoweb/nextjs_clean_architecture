import { adaptNextjsRoute } from "@/modules/backend/application/adapters";
import {
  makeDeleteCategoryController,
  makeGetCategoryByIdController,
  makeUpdateCategoryController,
} from "@/modules/backend/application/factories/controllers/category";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  return await adaptNextjsRoute(
    makeGetCategoryByIdController(),
    request,
    params
  );
};

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  return await adaptNextjsRoute(
    makeUpdateCategoryController(),
    request,
    params
  );
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  return await adaptNextjsRoute(
    makeDeleteCategoryController(),
    request,
    params
  );
};
