"use client";

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { StyledTable } from "../../../components/StyledTable";

type RowData = {
  nomeFantasia: string;
  cnpj: string;
  dataCadastro: string;
  situacao: string;
};

export default function SupplierPage() {
  const router = useRouter();

  const handleAddSupplier = () => {
    router.push("/dashboard/supplier/handler");
  };

  const [rowData] = useState<RowData[]>([
    {
      nomeFantasia: "Fornecedor A",
      cnpj: "12.345.678/0001-99",
      dataCadastro: "2024-01-15",
      situacao: "Ativo",
    },
    {
      nomeFantasia: "Fornecedor B",
      cnpj: "98.765.432/0001-10",
      dataCadastro: "2023-11-22",
      situacao: "Inativo",
    },
    {
      nomeFantasia: "Fornecedor C",
      cnpj: "11.223.344/0001-55",
      dataCadastro: "2024-02-05",
      situacao: "Ativo",
    },
  ]);

  const columns = [
    { header: "Nome Fantasia", field: "nomeFantasia" },
    { header: "CNPJ", field: "cnpj" },
    { header: "Data de Cadastro", field: "dataCadastro" },
    { header: "Situação", field: "situacao" },
    { header: "Operações", field: "operacoes" },
  ];

  return (
    <Flex direction="column" p={4}>
      <Box overflowY="auto" maxHeight="500px">
        <Box p="5px" paddingBottom={"15px"}>
          <Text fontSize="2xl" fontWeight="bold" color="green.500">
            Fornecedores
          </Text>
          <Text fontSize="lg" color="gray.600">
            Manunteção de fornecedores.
          </Text>

          <Button colorPalette="green" size="sm" mt={4}>
            Processar
          </Button>
        </Box>

        <Box overflowX="auto">
          <StyledTable rowData={rowData} columns={columns} />

          <Button
            colorPalette="green"
            onClick={handleAddSupplier}
            size="sm"
            mt={4}
          >
            Adicionar Fornecedor
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}
