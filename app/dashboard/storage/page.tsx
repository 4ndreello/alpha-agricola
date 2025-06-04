"use client";

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { StyledTable } from "../../../components/StyledTable";

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
    { header: "Material", field: "id" },
    { header: "Descrição", field: "description" },
    { header: "Qtd. Disponível", field: "available" },
    { header: "Qtd. Reservada", field: "reserved" },
    { header: "Saldo", field: "balance" },
  ];

  const handleLaunch = () => {
    router.push("/dashboard/storage/launch");
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
        </Box>

        <Box overflowX="auto">
          <StyledTable rowData={rowData} columns={columns} />

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
