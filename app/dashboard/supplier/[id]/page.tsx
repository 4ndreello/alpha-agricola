"use client";

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../../../components/ui/select";

import {
  Box,
  Button,
  Input,
  Skeleton,
  Text,
  Textarea,
  VStack,
  createListCollection,
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getSupplierById,
  patchSupplier,
  postSupplier,
} from "../../../utils/requests";
import { Status } from "../../../utils/types";

const SupplierForm = () => {
  const router = useRouter();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [status, setStatus] = useState(Status.ACTIVE);
  const [observations, setObservations] = useState("");

  useEffect(() => {
    if (typeof id === "string" && id !== "new") {
      getSupplierById(id).then((data) => {
        setName(data.name);
        setCnpj(data.cnpj);
        setStatus(data.status);
        setObservations(data.observations || "");
      });
    }
  }, [id]);

  const handleSave = async () => {
    if (typeof id === "string" && id !== "new") {
      const data = await patchSupplier({
        id: Number(id),
        name,
        cnpj,
        status,
        observations,
      });

      if (!data) {
        return;
      }
    } else {
      postSupplier({ name, cnpj, status, observations });
    }

    router.back();
  };

  const handleCancel = () => {
    confirm("Deseja realmente cancelar?") && router.back();
  };

  return (
    <Box p={8} mx="auto">
      <VStack gap={6}>
        {typeof id === "string" && id !== "new" && !cnpj ? (
          <Box w="full" gap={2} display="flex" flexDirection="column">
            <Skeleton height="40px" />
            <Skeleton height="40px" />
            <Skeleton height="40px" />
            <Skeleton height="40px" />
            <Skeleton height="250px" />
          </Box>
        ) : (
          <>
            <Box w="full">
              <Text mb={2} fontWeight="medium">
                Nome Fantasia
              </Text>
              <Input
                placeholder="Digite o nome fantasia"
                size="lg"
                w="full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box w="full">
              <Text mb={2} fontWeight="medium">
                CNPJ
              </Text>
              <Input
                placeholder="Digite o CNPJ"
                size="lg"
                w="full"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
              />
            </Box>
            <Box w="full">
              <SelectRoot
                size={"lg"}
                collection={statuses}
                defaultValue={[status]}
              >
                <SelectLabel>Situação</SelectLabel>
                <SelectTrigger>
                  <SelectValueText placeholder="Selecione uma situação" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.items.map((status) => (
                    <SelectItem item={status} key={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Box>
            <Box w="full">
              <Text mb={2} fontWeight="medium">
                Observações
              </Text>
              <Textarea
                placeholder="Digite as observações"
                size="lg"
                resize="none"
                height={64}
                w="full"
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
              />
            </Box>

            <Box w="full" display="flex" gap={2} justifyContent="flex-end">
              <Button bgColor="gray.500" size="lg" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button bgColor="green.500" size="lg" onClick={handleSave}>
                Salvar
              </Button>
            </Box>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default SupplierForm;

const statuses = createListCollection({
  items: [
    { label: "Ativo", value: Status.ACTIVE },
    { label: "Inativo", value: Status.INACTIVE },
  ],
});
