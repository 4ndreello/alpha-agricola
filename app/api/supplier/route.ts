import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { withErrorHandler } from "../../../utils/with.error.handler";
import { ZodErrorPipe } from "../../../utils/zod.pipe";
import { safeParseJSon } from "../../../utils/json.utils";
import { BadRequestException } from "../../../utils/http.errors";

const postBodySchema = z.object({
  name: z.string({ required_error: "O campo nome é obrigatório." }),
  cnpj: z.string({ required_error: "O campo cnpj é obrigatório." }),
});

async function get() {
  const users = await prisma.supplier.findMany({
    select: {
      id: true,
      name: true,
      cnpj: true,
      status: true,
    },
  });

  return Response.json(users);
}

async function post(request: Request) {
  const body = await safeParseJSon(request);

  ZodErrorPipe.parse(postBodySchema, body);

  const supplierWithCnpj = await prisma.supplier.findUnique({
    where: {
      cnpj: body.cnpj,
    },
  });

  if (supplierWithCnpj) {
    throw new BadRequestException("CNPJ já cadastrado.");
  }

  const supplier = await prisma.supplier.create({
    data: body,
  });

  return Response.json(supplier);
}

export const GET = withErrorHandler(get);
export const POST = withErrorHandler(post);
