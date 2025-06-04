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
  name: z.string({ required_error: "O campo nome é obrigatório." }),
  password: z.string({ required_error: "O campo senha é obrigatório." }).min(6),
});

async function post(request: Request) {
  // check if body is valid
  const body = await safeParseJSon(request);

  ZodErrorPipe.parse(postBodySchema, body);

  const userWithEmail = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (userWithEmail) {
    throw new BadRequestException("Email já cadastrado.");
  }

  const user = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      password: createHash("sha256").update(body.password).digest("hex"),
      type: "user",
    },
  });

  await createSession({
    userId: user.id,
    email: user.email,
  });

  return Response.json({
    user,
  });
}

export const POST = withErrorHandler(post);
