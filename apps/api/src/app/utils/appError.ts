export class AppError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    //capture stack trace
    // @ts-ignore
    Error.captureStackTrace(this, this.constructor);
  }
}
