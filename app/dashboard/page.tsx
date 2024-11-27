"use client";

import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Supplier from "../supplier/page";

export default function Dashboard() {
  const router = useRouter();
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const modules = [
    { name: "Fornecedores", key: "supplier" },
    { name: "Materiais", key: "materials" },
    { name: "Estoque", key: "storage" },
  ];

  const handleModuleClick = (moduleKey: string) => {
    setActiveModule(moduleKey);
  };

  const handleLogout = () => {
    router.replace("/");
  };

  const renderModuleContent = () => {
    switch (activeModule) {
      case "supplier":
        return (
          <Box bg="white" shadow="lg" borderRadius="lg" p={6} mb={6}>
            <Supplier />
          </Box>
        );
      case "materials":
        return (
          <Box bg="white" shadow="lg" borderRadius="lg" p={6} mb={6}>
            <Text fontSize="2xl" fontWeight="bold" color="green.500">
              Materiais
            </Text>
            <Text fontSize="lg" color="gray.600">
              Conteúdo do módulo materiais.
            </Text>
          </Box>
        );
      case "storage":
        return (
          <Box bg="white" shadow="lg" borderRadius="lg" p={6} mb={6}>
            <Text fontSize="2xl" fontWeight="bold" color="green.500">
              Estoque
            </Text>
            <Text fontSize="lg" color="gray.600">
              Conteúdo do módulo estoque.
            </Text>
          </Box>
        );
      default:
        return (
          <Flex justify="center" align="center" h="full">
            <Text fontSize="2xl" color="gray.500" fontWeight="semibold">
              Selecione um módulo para começar.
            </Text>
          </Flex>
        );
    }
  };

  return (
    <Flex h="100vh" bg="gray.50">
      <Box
        w="20%"
        bg="white"
        p={6}
        shadow="lg"
        borderRightWidth={1}
        borderColor="gray.200"
        display="flex"
        flexDirection="column"
      >
        <Text fontSize="lg" fontWeight="bold" mb={6} color="green.500">
          Módulos
        </Text>
        <VStack align="stretch" gap={4} flex="1">
          {modules.map((module) => (
            <Button
              key={module.key}
              variant="ghost"
              size="lg"
              colorScheme={activeModule === module.key ? "green" : "gray"}
              bg={activeModule === module.key ? "green.50" : "transparent"}
              shadow={activeModule === module.key ? "sm" : "none"}
              _hover={{ bg: "green.100" }}
              onClick={() => handleModuleClick(module.key)}
            >
              {module.name}
            </Button>
          ))}
        </VStack>
        <Button
          mt={4}
          colorScheme="red"
          size="lg"
          onClick={handleLogout}
          shadow="sm"
          _hover={{ bg: "red.600" }}
        >
          Sair
        </Button>
      </Box>
      <Box flex="1" p={8}>
        {renderModuleContent()}
      </Box>
    </Flex>
  );
}
