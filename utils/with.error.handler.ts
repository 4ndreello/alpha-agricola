import { NextResponse, type NextRequest } from "next/server";
import { HttpError } from "./http.errors";

type ApiRouteHandler = (
  request: NextRequest,
  context?: { params?: any }
) => Promise<NextResponse | Response>;

export function withErrorHandler(handler: ApiRouteHandler): ApiRouteHandler {
  return async (request: NextRequest, context?: { params?: any }) => {
    try {
      return await handler(request, context);
    } catch (error: any) {
      console.log("--- ERRO CAPTURADO PELO withErrorHandler ---");
      if (error && error.constructor) {
        console.log("Construtor do Erro:", error.constructor.name);
      }

      if (
        (error &&
          typeof error.statusCode === "number" &&
          typeof error.message === "string") ||
        error instanceof HttpError
      ) {
        console.log(
          `--- HttpError TRATADO: ${error.name} (Status: ${error.statusCode}) ---`
        );
        return NextResponse.json(
          {
            message: error.message,
            statusCode: error.statusCode,
            ...(error.details && { errors: error.details }),
          },
          { status: error.statusCode }
        );
      }

      if ("meta" in error) {
        console.log(
          `--- PrismaClientKnownRequestError TRATADO: ${error.name} (Status: ${error.meta.code}) ---`
        );
        return NextResponse.json(
          {
            message: error.message,
            statusCode: 400,
            ...(error.meta && { errors: error.meta }),
          },
          { status: 400 }
        );
      }

      console.error("--- ERRO INESPERADO (RUNTIME) ---");
      if (error instanceof Error) {
        console.error("Nome:", error.name);
        console.error("Mensagem:", error.message);
        console.error("Stack:", error.stack);
      } else {
        console.error("Erro (não Error instance):", error);
      }

      return NextResponse.json(
        {
          message: "Ocorreu um erro inesperado no servidor.",
          statusCode: 500,
        },
        { status: 500 }
      );
    }
  };
}
