import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { withErrorHandler } from "../../../utils/with.error.handler";
import { ZodErrorPipe } from "../../../utils/zod.pipe";
import { safeParseJSon } from "../../../utils/json.utils";

const postBodySchema = z.object({
  name: z.string({ required_error: "O campo nome é obrigatório." }),
  supplierId: z.string({ required_error: "O campo fornecedor é obrigatório." }),
  status: z.string({ required_error: "O campo status é obrigatório." }),
  observations: z.string().optional(),
});

const getParamsSchema = z.object({
  id: z.string().optional(),
});

async function get(request: Request) {
  const params = Object.fromEntries(
    new URL(request.url).searchParams.entries()
  );

  ZodErrorPipe.parse(getParamsSchema, params);

  const materials = await prisma.material.findMany({
    where: {
      ...(!params.id ? {} : { id: Number(params.id) }),
    },
  });

  return Response.json(params.id ? materials[0] : materials);
}

async function post(request: Request) {
  const body = await safeParseJSon(request);

  ZodErrorPipe.parse(postBodySchema, body);

  const material = await prisma.material.create({
    data: body,
  });

  return Response.json(material);
}

export const GET = withErrorHandler(get);
export const POST = withErrorHandler(post);
