"use client";

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { StyledTable } from "../../../components/StyledTable";

type RowData = {
  name: string;
  owner: string;
  createdAt: string;
  status: string;
};

export default function BirdsPage() {
  const router = useRouter();
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
    { header: "Nome", field: "name" },
    { header: "Dono", field: "owner" },
    { header: "Data de cadastro", field: "createdAt" },
    { header: "Situação", field: "status" },
    { header: "Operações", field: "operations" },
  ];

  const handleAddBird = () => {
    router.push("/dashboard/birds/handler");
  };

  return (
    <Flex direction="column" p={4}>
      <Box overflowY="auto" maxHeight="500px">
        <Box p="5px" paddingBottom={"15px"}>
          <Text fontSize="2xl" fontWeight="bold" color="green.500">
            Pássaros
          </Text>
          <Text fontSize="lg" color="gray.600">
            Manunteção de pássaros.
          </Text>

          <Button colorPalette="green" size="sm" mt={4}>
            Processar
          </Button>
        </Box>

        <Box overflowX="auto">
          <StyledTable rowData={rowData} columns={columns} />

          <Button
            colorPalette="green"
            onClick={() => handleAddBird()}
            size="sm"
            mt={4}
          >
            Adicionar pássaro
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}
