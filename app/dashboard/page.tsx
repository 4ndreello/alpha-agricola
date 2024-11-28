"use client";

import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa6";
import { LuBird } from "react-icons/lu";
import MaterialsPage from "../materials/page";
import Supplier from "../supplier/page";

export default function Dashboard() {
  const router = useRouter();
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const modules = [
    { name: "Fornecedores", key: "supplier", icon: FaUserFriends },
    { name: "Materiais", key: "materials", icon: LuBird },
    { name: "Estoque", key: "storage", icon: FaBoxOpen },
  ];

  const handleModuleClick = (moduleKey: string) => {
    setActiveModule(moduleKey);
  };

  const handleLogout = () => {
    confirm("Deseja realmente sair?") && router.replace("/");
  };

  const getModuleContent = () => {
    switch (activeModule) {
      case "supplier":
        return <Supplier />;
      case "materials":
        return <MaterialsPage />;
      case "storage":
        return <Supplier />;
    }
  };

  const renderModuleContent = () => {
    return (
      <>
        {activeModule ? (
          <Box
            bg="white"
            borderWidth={"1px"}
            borderColor={"gray.300"}
            borderRadius="lg"
            p={6}
            mb={6}
          >
            {getModuleContent()}
          </Box>
        ) : (
          <Flex justify="center" align="center" h="full">
            <Text fontSize="2xl" color="gray.500" fontWeight="semibold">
              Selecione um módulo para começar.
            </Text>
          </Flex>
        )}
      </>
    );
  };

  return (
    <Flex h="100vh" bg="gray.50">
      <Box
        w="20%"
        bg="white"
        p={6}
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
              bgColor={activeModule === module.key ? "green.100" : "gray.200"}
              color={activeModule === module.key ? "green.500" : "gray.500"}
              _hover={{ bg: "green.100" }}
              onClick={() => handleModuleClick(module.key)}
            >
              <module.icon /> {module.name}
            </Button>
          ))}
        </VStack>
        <Button
          mt={4}
          colorPalette="green"
          size="lg"
          onClick={handleLogout}
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
