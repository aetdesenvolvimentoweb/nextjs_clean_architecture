import { HttpRequest, HttpResponse } from ".";

export interface Controller<T = HttpRequest> {
  handle: (data: T) => Promise<HttpResponse>;
}
