"use client";

import { Box, Button, Flex, Skeleton, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { StyledTable } from "../../../components/StyledTable";
import { getStorage } from "../../utils/requests";
import { GetStorageResponse } from "../../utils/types";

export default function SupplierPage() {
  const router = useRouter();
  const [rowData, setRowData] = useState<GetStorageResponse[] | null>(null);

  const getData = async () => {
    const data = await getStorage();
    setRowData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    { header: "Material", field: "id" },
    { header: "Descrição", field: "name" },
    { header: "Qtd. Disponível", field: "available" },
    { header: "Qtd. Reservada", field: "reserved" },
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
          {rowData ? (
            <StyledTable rowData={rowData} columns={columns} />
          ) : (
            <Box w="full" gap={2} display="flex" flexDirection="column">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} height="15px" />
              ))}
            </Box>
          )}

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
