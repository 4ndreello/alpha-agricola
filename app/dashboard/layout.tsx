"use client";

import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { FaUserFriends } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa6";
import { LuBird } from "react-icons/lu";

const modules = [
  { name: "Fornecedores", key: "supplier", icon: FaUserFriends },
  { name: "Pássaros", key: "birds", icon: LuBird },
  { name: "Estoque", key: "storage", icon: FaBoxOpen },
];

export default function ModulesLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const handleModuleClick = (moduleKey: string) => {
    router.push(`/dashboard/${moduleKey}`);
  };

  const handleLogout = () => {
    confirm("Deseja realmente sair?") && router.replace("/");
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
              color="gray.500"
              bgColor="gray.200"
              _hover={{ bg: "green.100" }}
              onClick={() => handleModuleClick(module.key)}
            >
              <module.icon color="green" /> {module.name}
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
      <Box
        bg="white"
        borderWidth={"1px"}
        borderColor={"gray.300"}
        borderRadius="lg"
        m={6}
        flex={1}
        overflow="auto"
      >
        {children}
      </Box>
    </Flex>
  );
}
