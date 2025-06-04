// utils/zod.pipe.ts
import { z, ZodError, type ZodIssue } from "zod";
import { BadRequestException } from "./http.errors";

export class ZodErrorPipe {
  static parse<T extends z.ZodTypeAny>(schema: T, data: unknown): z.infer<T> {
    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        // Transforma os erros do Zod em um formato mais amigável se desejar,
        // ou apenas passe os `error.issues`.
        const formattedErrors = error.issues.map((issue: ZodIssue) => ({
          path: issue.path.join("."),
          message: issue.message,
          code: issue.code,
        }));
        throw new BadRequestException("Erro de validação.", formattedErrors);
      }
      // Se não for um ZodError, relance o erro original
      // ou transforme em um InternalServerErrorException
      throw new BadRequestException(
        (error as Error).message || "Erro ao processar os dados de entrada."
      );
    }
  }

  // Se você preferir um método que não lança exceção, mas retorna um resultado:
  static safeParse<T extends z.ZodTypeAny>(
    schema: T,
    data: unknown
  ): { success: true; data: z.infer<T> } | { success: false; error: ZodError } {
    return schema.safeParse(data);
  }
}
