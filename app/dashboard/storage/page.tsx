"use client";

import { Box, Button, Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";

type RowData = {
  id: string;
  description: string;
  available: number;
  reserved: number;
  balance: number;
};

export default function SupplierPage() {
  const router = useRouter();
  const [rowData] = useState<RowData[]>([
    {
      id: "1",
      description: "Semente de milho",
      available: 12,
      reserved: 7,
      balance: 5,
    },
    {
      id: "2",
      description: "Semente de girassol",
      available: 24,
      reserved: 12,
      balance: 12,
    },
    {
      id: "3",
      description: "Ração de bordercolie",
      available: 36,
      reserved: 12,
      balance: 24,
    },
  ]);

  const columns = [
    { headerName: "Material", field: "id" },
    { headerName: "Descrição", field: "description" },
    { headerName: "Qtd. Disponível", field: "available" },
    { headerName: "Qtd. Reservada", field: "reserved" },
    { headerName: "Saldo", field: "balance" },
    { headerName: "Operações", field: "operations" },
  ];

  const handleLaunch = () => {
    router.push("/dashboard/storage/launch");
  };

  const handleEdit = (rowIndex: number) => {
    alert(`Editar fornecedor na linha ${rowIndex}`);
  };

  const handleDelete = (rowIndex: number) => {
    alert(`Excluir fornecedor na linha ${rowIndex}`);
  };

  return (
    <Flex direction="column" p={4}>
      <Box overflowY="auto" maxHeight="500px">
        <Box p="5px" paddingBottom={"15px"}>
          <Text fontSize="2xl" fontWeight="bold" color="green.500">
            Estoque
          </Text>
          <Text fontSize="lg" color="gray.600">
            Gestão de Estoque
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
          <Button
            colorPalette="green"
            onClick={() => handleLaunch()}
            size="sm"
            mt={4}
          >
            Lançamento
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}
