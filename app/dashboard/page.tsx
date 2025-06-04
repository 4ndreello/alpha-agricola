"use client";

import { EmptyState, Flex, VStack } from "@chakra-ui/react";
import { HiCursorClick } from "react-icons/hi";

export default function SelectModuleScreen() {
  return (
    <Flex justify="center" align="center" h="full">
      <EmptyState.Root>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <HiCursorClick />
          </EmptyState.Indicator>
          <VStack textAlign="center">
            <EmptyState.Title>
              Selecione um módulo para começar
            </EmptyState.Title>
            <EmptyState.Description>
              Explore nossos módulos
            </EmptyState.Description>
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>
    </Flex>
  );
}
