"use client";

import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { FaHome, FaUserFriends } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa6";
import { LuBird } from "react-icons/lu";
import { MdOutlineMoney } from "react-icons/md";
import { RiAlignItemBottomFill } from "react-icons/ri";
import { TbCashRegister } from "react-icons/tb";

const modules = [
  { name: "Home", key: "/", icon: FaHome },
  { name: "Fornecedores", key: "supplier", icon: FaUserFriends },
  { name: "Pássaros", key: "birds", icon: LuBird },
  { name: "Materiais", key: "materials", icon: RiAlignItemBottomFill },
  { name: "Estoque", key: "storage", icon: FaBoxOpen },
  { name: "Contas a Receber", key: "storage", icon: TbCashRegister },
  { name: "Pedido de venda", key: "storage", icon: MdOutlineMoney },
];

export default function ModulesLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const theme = useTheme();
  const handleModuleClick = (moduleKey: string) => {
    router.push(`/dashboard${moduleKey ? `/${moduleKey}` : ""}`);
  };

  useEffect(() => {
    console.log("whats going on xpto", { theme });
  }, [theme]);

  const createButton = (module: (typeof modules)[number]) => (
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
