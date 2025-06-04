// utils/http-errors.ts

export class HttpError extends Error {
  public readonly statusCode: number;
  public readonly details?: any; // Para detalhes adicionais, como erros de validação do Zod

  constructor(message: string, statusCode: number, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    // Mantém o stack trace correto para erros customizados
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
  }
}

export class BadRequestException extends HttpError {
  constructor(message: string = "Requisição inválida", details?: any) {
    super(message, 400, details);
  }
}

export class UnauthorizedException extends HttpError {
  constructor(message: string = "Não autorizado", details?: any) {
    super(message, 401, details);
  }
}

export class ForbiddenException extends HttpError {
  constructor(message: string = "Acesso proibido", details?: any) {
    super(message, 403, details);
  }
}

export class NotFoundException extends HttpError {
  constructor(message: string = "Recurso não encontrado", details?: any) {
    super(message, 404, details);
  }
}

export class ConflictException extends HttpError {
  constructor(message: string = "Conflito", details?: any) {
    super(message, 409, details);
  }
}

export class UnprocessableEntityException extends HttpError {
  // Ótima para erros de validação semânticos, após a validação de formato (400)
  constructor(message: string = "Entidade não processável", details?: any) {
    super(message, 422, details);
  }
}

export class InternalServerErrorException extends HttpError {
  constructor(message: string = "Erro interno do servidor", details?: any) {
    super(message, 500, details);
  }
}
