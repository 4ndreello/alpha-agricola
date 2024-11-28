"use client";

import { Box, Button, Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";

export default function MaterialsPage() {
  type RowData = {
    name: string;
    owner: string;
    createdAt: string;
    status: string;
  };

  const [rowData] = useState<RowData[]>([
    {
      name: "Pet A",
      owner: "Gabriel Andreello",
      createdAt: "15/01/2024",
      status: "Ativo",
    },
    {
      name: "Pet B",
      owner: "Enzo Vieira",
      createdAt: "22/10/2023",
      status: "Inativo",
    },
    {
      name: "Pet C",
      owner: "João Silva",
      createdAt: "01/05/2022",
      status: "Ativo",
    },
  ]);

  const columns = [
    { headerName: "Nome", field: "name" },
    { headerName: "Dono", field: "owner" },
    { headerName: "Data de Cadastro", field: "createdAt" },
    { headerName: "Situação", field: "status" },
    { headerName: "Operações", field: "operations" },
  ];

  const handleEdit = (rowIndex: number) => {
    alert(`Editar material na linha ${rowIndex}`);
  };

  const handleDelete = (rowIndex: number) => {
    alert(`Excluir material na linha ${rowIndex}`);
  };

  return (
    <Flex direction="column" p={4}>
      <Box overflowY="auto" maxHeight="500px">
        <Box p="5px" paddingBottom={"15px"}>
          <Text fontSize="2xl" fontWeight="bold" color="green.500">
            Materiais
          </Text>
          <Text fontSize="lg" color="gray.600">
            Manunteção de materiais.
          </Text>

          <Button colorPalette="green" size="sm" mt={4}>
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
          <Button colorPalette="green" size="sm" mt={4}>
            Adicionar Material
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}
