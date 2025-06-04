import { BadRequestException } from "../../../../utils/http.errors";
import { withErrorHandler } from "../../../../utils/with.error.handler";
import prisma from "../../../../lib/prisma";

async function getStorage(request: Request) {
  const id = request.url.split("/").pop();

  const storage = await prisma.storage.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!storage) {
    throw new BadRequestException("Estoque não encontrado.");
  }

  return Response.json({ storage });
}

export const GET = withErrorHandler(getStorage);
