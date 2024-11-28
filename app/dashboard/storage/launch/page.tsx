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
  VStack,
  createListCollection,
} from "@chakra-ui/react";

const SupplierForm = () => {
  return (
    <Box p={8} mx="auto">
      <VStack gap={6}>
        <Box w="full">
          <Text mb={2} fontWeight="medium">
            Item
          </Text>
          <Input placeholder="Digite o número do material" size="lg" w="full" />
        </Box>
        <Box w="full">
          <SelectRoot size={"lg"} collection={frameworks}>
            <SelectLabel>Tipo de movimento</SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder="Selecione um movimento" />
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
            Quantidade
          </Text>
          <Input
            placeholder="Digite a quantidade do movimento"
            size="lg"
            w="full"
          />
        </Box>
        <Button bgColor="green.500" size="lg" w="full">
          Lançar movimento
        </Button>
      </VStack>
    </Box>
  );
};

export default SupplierForm;

const frameworks = createListCollection({
  items: [
    { label: "Entrada", value: "plus" },
    { label: "Saída", value: "less" },
  ],
});
