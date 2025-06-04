import { prisma } from "../../..//lib/prisma";
import { withErrorHandler } from "../../../utils/with.error.handler";

async function get() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return Response.json(users);
}

export const GET = withErrorHandler(get);
