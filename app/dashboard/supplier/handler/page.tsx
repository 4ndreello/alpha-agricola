import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Box, Button, Input, Textarea, VStack } from "@chakra-ui/react";

const EmpresaForm = () => {
  return (
    <Box>
      <VStack gap={4}>
        <FormControl>
          <FormLabel>Nome Fantasia</FormLabel>
          <Input placeholder="Digite o nome fantasia" />
        </FormControl>
        <FormControl>
          <FormLabel>CNPJ</FormLabel>
          <Input placeholder="Digite o CNPJ" />
        </FormControl>
        <FormControl>
          <FormLabel>Situação</FormLabel>
        </FormControl>
        <FormControl>
          <FormLabel>Observações</FormLabel>
          <Textarea placeholder="Digite as observações" />
        </FormControl>
        <Button colorScheme="blue" w="full">
          Salvar
        </Button>
      </VStack>
    </Box>
  );
};

export default EmpresaForm;
