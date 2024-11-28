"use client";

import {
  Box,
  Button,
  For,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
  createListCollection,
} from "@chakra-ui/react";

const BirdsForm = () => {
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
          <Text mb={2} fontWeight="medium">
            Dono
          </Text>
          <Input placeholder="Digite o nome do dono" size="lg" w="full" />
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

export default BirdsForm;

const frameworks = createListCollection({
  items: [
    { label: "Ativo", value: "active" },
    { label: "Inativo", value: "inactive" },
  ],
});

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../../../components/ui/select";
