import { RpcException } from '@nestjs/microservices';

export default class ServicesException extends RpcException {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly errorName: string;

  constructor(statusCode: number, message: string, errorName: string) {
    super({ statusCode, message, errorName });
    this.errorName = errorName;
    this.message = message;
    this.statusCode = statusCode;
  }

  getError(): string | object {
    return {
      statusCode: this.statusCode,
      name: this.name,
      errorName: this.errorName,
    };
  }
}
