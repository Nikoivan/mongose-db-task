export class UserError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.name = 'UserError';
    this.code = code;
  }
}
