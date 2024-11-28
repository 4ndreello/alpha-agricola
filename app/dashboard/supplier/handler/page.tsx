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

const SupplierForm = () => {
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
          <SelectRoot size={"lg"} collection={frameworks}>
            <SelectLabel>Situação</SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder="Selecione uma situação" />
            </SelectTrigger>
            <SelectContent>
              {frameworks.items.map((movie) => (
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
        <Button bgColor="green.500" size="lg" w="full">
          Salvar
        </Button>
      </VStack>
    </Box>
  );
};

export default SupplierForm;

const frameworks = createListCollection({
  items: [
    { label: "Ativo", value: "active" },
    { label: "Inativo", value: "inactive" },
  ],
});
