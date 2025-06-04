import { z } from "zod";
import { ZodErrorPipe } from "../../../../utils/zod.pipe";
import { safeParseJSon } from "../../../../utils/json.utils";
import { withErrorHandler } from "../../../../utils/with.error.handler";
import { prisma } from "../../../../lib/prisma";
import { createHash } from "crypto";
import { BadRequestException } from "../../../../utils/http.errors";
import { createSession } from "../../../../lib/auth";

const postBodySchema = z.object({
  email: z
    .string({ required_error: "O campo e-mail é obrigatório." })
    .email({ message: "Formato de e-mail inválido." }),
  password: z.string({ required_error: "O campo senha é obrigatório." }).min(6),
});

async function post(request: Request) {
  // check if body is valid
  const body = await safeParseJSon(request);

  ZodErrorPipe.parse(postBodySchema, body);

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: createHash("sha256").update(body.password).digest("hex"),
    },
    select: {
      id: true,
      email: true,
    },
  });

  if (!user) {
    throw new BadRequestException("Email ou senha inválidos.");
  }

  await createSession({
    userId: user.id,
    email: user.email,
  });

  return Response.json({
    user,
  });
}

export const POST = withErrorHandler(post);
