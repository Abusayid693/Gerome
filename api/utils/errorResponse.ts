export class ErrorResponse extends Error {
  constructor(message: any | string, public statusCode: number) {
    super(message);
  }
  success = false;
}

export class NotFoundResponse extends ErrorResponse {
  constructor(message: any | string) {
    super(`Not Found Error: ${message}`, 409);
  }
}
