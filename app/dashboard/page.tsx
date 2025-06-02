"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function SelectModuleScreen() {
  const { setTheme } = useTheme();
  useEffect(() => setTheme("light"), []);

  return (
    <Flex justify="center" align="center" h="full">
      <Box p={6}>
        <Text fontSize="2xl" color="gray.500" fontWeight="semibold">
          Selecione um módulo para começar :)
        </Text>
      </Box>
    </Flex>
  );
}
