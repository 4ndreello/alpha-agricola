"use client";

import {
  Box,
  Button,
  createListCollection,
  Input,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getMaterialById, getSuppliers } from "../../../utils/requests";
import { Status } from "../../../utils/types";

const MaterialsForm = () => {
  const { id } = useParams();

  const [, setName] = useState("");
  const [, setStatus] = useState(Status.ACTIVE);
  const [, setObservations] = useState("");

  const [suppliers, setSuppliers] = useState(
    createListCollection<{ value: string; label: string }>({
      items: [],
    })
  );

  useEffect(() => {
    getSuppliers().then((data) => {
      setSuppliers(
        createListCollection({
          items: data.map((supplier) => ({
            label: supplier.name,
            value: String(supplier.id),
          })),
        })
      );
    });

    if (typeof id === "string" && id !== "new") {
      getMaterialById(id).then((data) => {
        setName(data.name);
        // setFornecedor(data.supplierId);
        setStatus(data.status);
        setObservations(data.observations || "");
      });
    }
  }, []);

  return (
    <Box p={8} mx="auto">
      <VStack gap={6}>
        <Box w="full">
          <Text mb={2} fontWeight="medium">
            Nome
          </Text>
          <Input placeholder="Digite o nome" size="lg" w="full" />
        </Box>

        <Box w="full">
          <SelectRoot size={"lg"} collection={suppliers}>
            <SelectLabel>Fornecedor</SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder="Selecione um fornecedor" />
            </SelectTrigger>
            <SelectContent>
              {suppliers.items.map((supplier) => (
                <SelectItem item={supplier} key={supplier.value}>
                  {supplier.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Box>

        <Box w="full">
          <SelectRoot size={"lg"} collection={statuses}>
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

        <Box w="full" display="flex" gap={2} justifyContent="flex-end">
          <Button bgColor="gray.500" size="lg">
            Cancelar
          </Button>
          <Button bgColor="green.500" size="lg">
            Salvar
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default MaterialsForm;

const statuses = createListCollection({
  items: [
    { label: "Ativo", value: Status.ACTIVE },
    { label: "Inativo", value: Status.INACTIVE },
  ],
});
