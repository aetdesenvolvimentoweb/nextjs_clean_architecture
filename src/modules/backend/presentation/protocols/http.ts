export interface HttpRequest {
  body?: any;
  params?: {
    id: string;
  };
}

export interface HttpResponse {
  data?: any;
  error?: string;
  statusCode: number;
}
