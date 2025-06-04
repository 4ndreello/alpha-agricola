import { safeParseJSon } from "../../../../utils/json.utils";
import { withErrorHandler } from "../../../../utils/with.error.handler";
import { z } from "zod";
import { ZodErrorPipe } from "../../../../utils/zod.pipe";
import { SupplierStatus } from "../../../utils/types";
import { prisma } from "../../../../lib/prisma";
import { BadRequestException } from "../../../../utils/http.errors";

const patchBodySchema = z.object({
  name: z.string(),
  cnpj: z.string(),
  status: z.nativeEnum(SupplierStatus),
  observations: z.string().optional(),
});

const deleteSupplier = async (request: Request) => {
  const id = request.url.split("/").pop();

  const supplier = await prisma.supplier.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!supplier) {
    throw new BadRequestException("Fornecedor não encontrado.");
  }

  await prisma.supplier.delete({
    where: {
      id: Number(id),
    },
  });

  return Response.json({ message: "Fornecedor deletado com sucesso." });
};

const patch = async (request: Request) => {
  const body = await safeParseJSon(request);
  const id = request.url.split("/").pop();

  ZodErrorPipe.parse(patchBodySchema, body);

  const supplier = await prisma.supplier.update({
    where: {
      id: Number(id),
    },
    data: body,
  });

  return Response.json(supplier);
};

export const DELETE = withErrorHandler(deleteSupplier);
export const PATCH = withErrorHandler(patch);
