import { Storage } from "@prisma/client";
import prisma from "../../../lib/prisma";
import { withErrorHandler } from "../../../utils/with.error.handler";
import { Status } from "../../utils/types";
import { safeParseJSon } from "../../../utils/json.utils";
import { ZodErrorPipe } from "../../../utils/zod.pipe";
import { z } from "zod";

const postBodySchema = z.object({
  materialId: z.string(),
  type: z.enum(["entrada", "saida", "reservado"]),
  quantity: z.number(),
});

export function calculateStorage(materialId: number, storage: Storage[]) {
  const storageItems = storage.filter((s) => s.materialId === materialId);
  const typeReservado = storageItems
    .filter((s) => s.type === "reservado")
    .reduce((acc, item) => acc + item.quantity, 0);

  const typeEntrada = storageItems
    .filter((s) => s.type === "entrada")
    .reduce((acc, item) => acc + item.quantity, 0);

  const typeSaida = storageItems
    .filter((s) => s.type === "saida")
    .reduce((acc, item) => acc + item.quantity, 0);

  return {
    reserved: typeReservado,
    available: typeEntrada - typeSaida - typeReservado,
  };
}

async function getStorage(request: Request) {
  const materials = await prisma.material.findMany({
    where: {
      status: Status.ACTIVE,
    },
    select: {
      id: true,
      name: true,
    },
  });
  const storage = await prisma.storage.findMany({});

  const response = materials.map((material) => {
    const { reserved, available } = calculateStorage(material.id, storage);

    return {
      ...material,
      reserved,
      available,
    };
  });

  return Response.json(response);
}

async function post(request: Request) {
  const body = await safeParseJSon(request);

  ZodErrorPipe.parse(postBodySchema, body);

  const storage = await prisma.storage.create({
    data: {
      materialId: +body.materialId,
      type: body.type,
      quantity: body.quantity,
    },
  });

  return Response.json(storage);
}

export const GET = withErrorHandler(getStorage);
export const POST = withErrorHandler(post);
