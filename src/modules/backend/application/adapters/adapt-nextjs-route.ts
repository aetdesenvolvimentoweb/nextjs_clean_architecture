import { NextResponse } from "next/server";
import {
  Controller,
  HttpRequest,
} from "@/modules/backend/presentation/protocols";

export const adaptNextjsRoute = async (
  controller: Controller,
  request: HttpRequest
) => {
  const httpResponse = await controller.handle(request);

  if (httpResponse.error) {
    return NextResponse.json(
      { error: httpResponse.error },
      { status: httpResponse.statusCode }
    );
  } else {
    return NextResponse.json(
      { data: httpResponse.data },
      { status: httpResponse.statusCode }
    );
  }
};
