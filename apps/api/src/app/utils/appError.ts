export class AppError extends Error {
  public isOperational = true;
  constructor(
    public message: string,
    public statusCode: number,
    public errors?: any[]
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errors = errors;
    //capture stack trace
    // @ts-ignore
    Error.captureStackTrace(this, this.constructor);
  }
}
