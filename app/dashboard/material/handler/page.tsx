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
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getSuppliers } from "../../../utils/requests";
import { SupplierStatus } from "../../../utils/types";

const MaterialsForm = () => {
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
          />
        </Box>
        <Button bgColor="green.500" size="lg" w="full">
          Salvar
        </Button>
      </VStack>
    </Box>
  );
};

export default MaterialsForm;

const statuses = createListCollection({
  items: [
    { label: "Ativo", value: SupplierStatus.ACTIVE },
    { label: "Inativo", value: SupplierStatus.INACTIVE },
  ],
});
