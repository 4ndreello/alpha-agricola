"use client";

import { Box, Button, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { FaHome, FaMoon, FaSun, FaUserFriends } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa6";
import { MdOutlineMoney } from "react-icons/md";
import { RiAlignItemBottomFill } from "react-icons/ri";
import { TbCashRegister } from "react-icons/tb";

const modules = [
  { name: "Fornecedores", key: "supplier", icon: FaUserFriends },
  { name: "Materiais", key: "material", icon: RiAlignItemBottomFill },
  { name: "Estoque", key: "storage", icon: FaBoxOpen },
  { name: "Contas a Receber", key: "payday", icon: TbCashRegister },
  { name: "Pedido de venda", key: "sale", icon: MdOutlineMoney },
];

export default function ModulesLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const handleModuleClick = (moduleKey: string) => {
    router.push(`/dashboard${moduleKey ? `/${moduleKey}` : ""}`);
  };

  const { theme, setTheme } = useTheme();

  const createButton = (module: (typeof modules)[number]) => (
    <Box
      _hover={{ transform: "scale(1.05)" }}
      cursor="pointer"
      display="flex"
      alignItems="center"
      gap={2}
      transition="all 0.2s"
      onClick={() => handleModuleClick(module.key)}
      key={module.key}
    >
      <Icon boxSize={6} color="gray.500" as={module.icon} />
      <Text fontSize="sm" color="gray.500">
        {module.name}
      </Text>
    </Box>
  );

  const handleLogout = () => {
    confirm("Deseja realmente sair?") && router.replace("/");
  };

  return (
    <Flex h="100vh">
      <Box
        p={6}
        borderRightWidth={1}
        borderColor="gray.200"
        display="flex"
        flexDirection="column"
      >
        <Box
          display="flex"
          gap={2}
          alignItems="center"
          mb={6}
          justifyContent="center"
        >
          <Icon
            boxSize={6}
            color="gray.500"
            _hover={{ color: "green.500", transform: "scale(1.2)" }}
            cursor="pointer"
            transition="all 0.2s"
            as={FaHome}
            onClick={() => handleModuleClick("")}
          />
          {theme === "dark" ? (
            <Icon
              boxSize={6}
              color="gray.500"
              _hover={{ color: "green.500", transform: "scale(1.2)" }}
              cursor="pointer"
              transition="all 0.2s"
              as={FaMoon}
              onClick={() => setTheme("light")}
            />
          ) : (
            <Icon
              boxSize={6}
              color="gray.500"
              _hover={{ color: "green.500", transform: "scale(1.2)" }}
              cursor="pointer"
              transition="all 0.2s"
              as={FaSun}
              onClick={() => setTheme("dark")}
            />
          )}
        </Box>
        <Text fontSize="lg" fontWeight="bold" mb={6} color="green.500">
          Módulos
        </Text>
        <VStack align="stretch" gap={4} flex="1">
          {modules.map((module) => createButton(module))}
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
      <Box m={6} flex={1} overflow="auto">
        {children}
      </Box>
    </Flex>
  );
}
