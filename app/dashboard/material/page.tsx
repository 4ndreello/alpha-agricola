"use client";

import { Box, Button, Flex, Skeleton, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { StyledTable } from "../../../components/StyledTable";
import { getMaterials } from "../../utils/requests";
import { GetMaterialResponse, Status } from "../../utils/types";

export default function BirdsPage() {
  const router = useRouter();
  const [rowData, setRowData] = useState<GetMaterialResponse[] | null>(null);

  useEffect(() => {
    getMaterials().then((data) => {
      setRowData(
        data.map((material) => ({
          ...material,
          status: material.status === Status.ACTIVE ? "Ativo" : "Inativo",
        }))
      );
    });
  }, []);

  const columns = [
    { header: "Código", field: "id" },
    { header: "Nome", field: "name" },
    { header: "Fornecedor", field: "supplierId" },
    { header: "Situação", field: "status" },
  ];

  const handleAddMaterial = () => {
    router.push("/dashboard/material/new");
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
        </Box>

        <Box overflowX="auto">
          {rowData ? (
            <StyledTable rowData={rowData} columns={columns} hasOperations />
          ) : (
            <Box w="full" gap={2} display="flex" flexDirection="column">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} height="15px" />
              ))}
            </Box>
          )}

          <Button
            colorPalette="green"
            onClick={() => handleAddMaterial()}
            size="sm"
            mt={4}
          >
            Adicionar material
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}
