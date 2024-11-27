"use client";

import { Box, Button, Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";

export default function SupplierPage() {
  type RowData = {
    nomeFantasia: string;
    cnpj: string;
    dataCadastro: string;
    situacao: string;
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
    { headerName: "Nome Fantasia", field: "nomeFantasia" },
    { headerName: "CNPJ", field: "cnpj" },
    { headerName: "Data de Cadastro", field: "dataCadastro" },
    { headerName: "Situação", field: "situacao" },
    { headerName: "Operações", field: "operacoes" },
  ];

  const handleEdit = (rowIndex: number) => {
    alert(`Editar fornecedor na linha ${rowIndex}`);
  };

  const handleDelete = (rowIndex: number) => {
    alert(`Excluir fornecedor na linha ${rowIndex}`);
  };

  return (
    <Flex direction="column" p={4}>
      <Box
        bg="white"
        borderRadius="lg"
        shadow="lg"
        p={4}
        overflowY="auto"
        maxHeight="500px"
      >
        <Box p="5px" paddingBottom={"15px"}>
          <Text fontSize="2xl" fontWeight="bold" color="green.500">
            Fornecedores
          </Text>
          <Text fontSize="lg" color="gray.600">
            Manunteção de fornecedores.
          </Text>

          <Button colorScheme="green" size="sm" mt={4}>
            Processar
          </Button>
        </Box>

        <Box overflowX="auto">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    style={{
                      padding: "12px",
                      backgroundColor: "#f4f4f4",
                      borderBottom: "2px solid #ddd",
                      textAlign: "left",
                    }}
                  >
                    {column.headerName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rowData.map((row, index) => (
                <tr key={index}>
                  {columns.slice(0, -1).map((column, colIndex) => (
                    <td
                      key={colIndex}
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {row[column.field as keyof RowData]}
                    </td>
                  ))}
                  <td
                    style={{
                      padding: "8px",
                      borderBottom: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    <HStack>
                      <IconButton
                        bg={"white"}
                        color={"black"}
                        size={"xs"}
                        title="Alterar"
                        onClick={() => handleEdit(index)}
                      >
                        <FaPenToSquare />
                      </IconButton>

                      <IconButton
                        bg={"white"}
                        color={"red"}
                        size={"xs"}
                        title="Deletar"
                        onClick={() => handleDelete(index)}
                      >
                        <FaTrash />
                      </IconButton>
                    </HStack>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button colorScheme="green" size="sm" mt={4}>
            Adicionar Fornecedor
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}
