"use client";

import { Box, Button, Center, Input, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    alert("Login realizado com sucesso!");
    router.replace("/dashboard");
  };

  return (
    <Center h="100vh" bg="gray.50">
      <Box bg="white" p={8} rounded="lg" shadow="md" maxW="sm" w="full">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={4}>
          Alpha Agropecuaria
        </Text>
        <Stack gap={4}>
          <Box>
            <Text mb={1}>Email</Text>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
            />
          </Box>
          <Box>
            <Text mb={1}>Senha</Text>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
            />
          </Box>
          <Button colorScheme="blue" onClick={handleLogin}>
            Entrar
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
