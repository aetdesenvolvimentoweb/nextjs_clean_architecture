import { CustomAppError } from "../../domain/errors";
import { HttpResponse } from "../protocols";

export const serverError = (): HttpResponse => {
  return {
    error: "Um erro inesperado aconteceu.",
    statusCode: 500,
  };
};

export const clientError = (error: CustomAppError): HttpResponse => {
  return { error: error.message, statusCode: error.statusCode };
};

export const customAppError = (error: Error): HttpResponse => {
  if (error instanceof CustomAppError) {
    return clientError(error);
  }
  return serverError();
};

export const createWithSuccess = (): HttpResponse => {
  return { statusCode: 201 };
};
