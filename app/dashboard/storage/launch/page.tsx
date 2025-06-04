"use client";

import { useEffect, useState } from "react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../../../components/ui/select";

import {
  Box,
  Button,
  Input,
  Skeleton,
  Text,
  VStack,
  createListCollection,
} from "@chakra-ui/react";
import { getMaterials, postStorage } from "../../../utils/requests";
import { useRouter } from "next/navigation";

const SupplierForm = () => {
  const router = useRouter();
  const [materials, setMaterials] = useState(
    createListCollection<{ value: string; label: string }>({
      items: [],
    })
  );

  const [selectedMaterial, setSelectedMaterial] = useState<string>();
  const [movementType, setMovementType] = useState("entrada");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    getMaterials().then((data) => {
      setMaterials(
        createListCollection({
          items: data.map((material) => ({
            label: material.name,
            value: String(material.id),
          })),
        })
      );
    });
  }, []);

  async function handleLaunch() {
    if (!selectedMaterial || !movementType || !quantity) return;

    const response = await postStorage({
      materialId: selectedMaterial,
      type: movementType,
      quantity: Number(quantity),
    });
    if (!response) return;

    router.back();
  }

  return (
    <Box p={8} mx="auto">
      <VStack gap={6}>
        {materials?.items.length === 0 ? (
          <Box w="full" gap={2} display="flex" flexDirection="column">
            <Skeleton height="40px" />
          </Box>
        ) : (
          <Box w="full">
            <SelectRoot
              size={"lg"}
              collection={materials}
              onChange={(e: any) => {
                setSelectedMaterial(e.target.value);
              }}
            >
              <SelectLabel>Material</SelectLabel>
              <SelectTrigger>
                <SelectValueText placeholder="Selecione um material" />
              </SelectTrigger>
              <SelectContent>
                {materials.items.map((material) => (
                  <SelectItem item={material} key={material.value}>
                    {material.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </Box>
        )}

        <Box w="full">
          <SelectRoot
            size={"lg"}
            collection={movementTypes}
            onChange={(e: any) => {
              setMovementType(e.target.value);
            }}
          >
            <SelectLabel>Tipo de movimento</SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder="Selecione um movimento" />
            </SelectTrigger>
            <SelectContent>
              {movementTypes.items.map((type) => (
                <SelectItem item={type} key={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Box>

        <Box w="full">
          <Text mb={2} fontWeight="medium">
            Quantidade
          </Text>
          <Input
            placeholder="Digite a quantidade do movimento"
            size="lg"
            w="full"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Box>

        <Box w="full" display="flex" gap={2} justifyContent="flex-end">
          <Button
            bgColor="gray.500"
            size="lg"
            onClick={() => {
              router.back();
            }}
          >
            Cancelar
          </Button>
          <Button bgColor="green.500" size="lg" onClick={handleLaunch}>
            Lançar
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default SupplierForm;

const movementTypes = createListCollection({
  items: [
    { label: "Entrada", value: "entrada" },
    { label: "Saída", value: "saida" },
    { label: "Reserva", value: "reservado" },
  ],
});
