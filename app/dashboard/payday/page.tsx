"use client";

import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { StyledTable } from "../../../components/StyledTable";
import { deleteSupplier } from "../../utils/requests";

export default function SupplierPage() {
  const router = useRouter();

  const [rowData, setRowData] = useState<any[] | null>(null);

  const getData = async () => {
    setRowData([
      {
        id: "1",
        data: "15/01/2025",
        status: "Pendente",
        dataPagto: "-",
        valorTotal: "R$ 1.500,00",
      },
      {
        id: "2",
        data: "20/01/2025",
        status: "Pago",
        dataPagto: "20/01/2025",
        valorTotal: "R$ 2.300,00",
      },
      {
        id: "3",
        data: "25/01/2025",
        status: "Cancelado",
        dataPagto: "-",
        valorTotal: "R$ 800,00",
      },
      {
        id: "4",
        data: "02/02/2025",
        status: "Pendente",
        dataPagto: "-",
        valorTotal: "R$ 950,00",
      },
    ]);
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    { header: "Data", field: "data" },
    { header: "Status", field: "status" },
    { header: "Data de Pagto.", field: "dataPagto" },
    { header: "Valor Total", field: "valorTotal" },
  ];

  return (
    <Flex direction="column" p={4}>
      <Box overflowY="auto" maxHeight="500px">
        <Box p="5px" paddingBottom={"15px"}>
          <Text fontSize="2xl" fontWeight="bold" color="green.500">
            Contas a Receber
          </Text>
          <Text fontSize="lg" color="gray.600">
            Manunteção de contas a receber.
          </Text>
        </Box>

        <Box overflowX="auto" w="full">
          {rowData ? (
            <StyledTable
              rowData={rowData}
              columns={columns}
              hasOperations={true}
              handleEdit={(id) => router.push(`/dashboard/supplier/${id}`)}
              handleDelete={async (id) => {
                if (confirm("Deseja realmente deletar?")) {
                  await deleteSupplier(id);
                  getData();
                }
              }}
            />
          ) : (
            <Box w="full" gap={2} display="flex" flexDirection="column">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} height="15px" />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Flex>
  );
}
