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
  Text,
  Textarea,
  VStack,
  createListCollection,
} from "@chakra-ui/react";
import { SupplierStatus } from "../../../utils/types";
import { useRouter } from "next/navigation";

const SupplierForm = () => {
  const router = useRouter();

  const handleCancel = () => {
    confirm("Deseja realmente cancelar?") && router.back();
  };

  return (
    <Box p={8} mx="auto">
      <VStack gap={6}>
        <Box w="full">
          <Text mb={2} fontWeight="medium">
            Nome Fantasia
          </Text>
          <Input placeholder="Digite o nome fantasia" size="lg" w="full" />
        </Box>
        <Box w="full">
          <Text mb={2} fontWeight="medium">
            CNPJ
          </Text>
          <Input placeholder="Digite o CNPJ" size="lg" w="full" />
        </Box>
        <Box w="full">
          <SelectRoot size={"lg"} collection={statuses}>
            <SelectLabel>Situação</SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder="Selecione uma situação" />
            </SelectTrigger>
            <SelectContent>
              {statuses.items.map((movie) => (
                <SelectItem item={movie} key={movie.value}>
                  {movie.label}
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

        <Box w="full" display="flex" gap={2} justifyContent="flex-end">
          <Button bgColor="gray.500" size="lg" onClick={handleCancel}>
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

export default SupplierForm;

const statuses = createListCollection({
  items: [
    { label: "Ativo", value: SupplierStatus.ACTIVE },
    { label: "Inativo", value: SupplierStatus.INACTIVE },
  ],
});
