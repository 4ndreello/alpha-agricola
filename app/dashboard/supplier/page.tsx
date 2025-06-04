"use client";

import { Box, Button, Flex, Skeleton, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { StyledTable } from "../../../components/StyledTable";
import { deleteSupplier, getSuppliers } from "../../utils/requests";
import { SupplierStatus } from "../../utils/types";

type RowData = {
  nomeFantasia: string;
  cnpj: string;
  situacao: string;
};

export default function SupplierPage() {
  const router = useRouter();

  const handleAddSupplier = () => {
    router.push("/dashboard/supplier/new");
  };

  const [rowData, setRowData] = useState<RowData[] | null>(null);

  const getData = async () => {
    getSuppliers().then((data) => {
      setRowData(
        data.map((supplier) => ({
          id: supplier.id,
          nomeFantasia: supplier.name,
          cnpj: supplier.cnpj,
          situacao:
            supplier.status === SupplierStatus.ACTIVE ? "Ativo" : "Inativo",
        }))
      );
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    { header: "Código", field: "id" },
    { header: "Nome Fantasia", field: "nomeFantasia" },
    { header: "CNPJ", field: "cnpj" },
    { header: "Situação", field: "situacao" },
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
