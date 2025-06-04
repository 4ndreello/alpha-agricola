import {
  GetMaterialResponse,
  GetStorageResponse,
  GetSupplierResponse,
  PostStorage,
} from "./types";

const fetcher = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);

  const responseData = await response.json();
  if (!response.ok) {
    alert(responseData.message);
    return;
  }

  return responseData;
};

const generatePostConfig = (body: unknown) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

export const deleteSupplier = async (id: string) => {
  const data = await fetcher("/api/supplier/" + id, {
    method: "DELETE",
  });

  return data;
};

export const postSupplier = async (
  payload: Omit<GetSupplierResponse, "id">
) => {
  const data = await fetcher("/api/supplier", generatePostConfig(payload));
  return data;
};

export const postLogin = async (email: string, password: string) => {
  const data = await fetcher(
    "/api/pub/login",
    generatePostConfig({ email, password })
  );

  return data;
};

export const postStorage = async (payload: PostStorage) => {
  const data = await fetcher("/api/storage", generatePostConfig(payload));
  return data;
};

export const getStorage = async () => {
  const data = await fetcher("/api/storage");
  return data as GetStorageResponse[];
};

export const getMaterials = async () => {
  const data = await fetcher("/api/material");
  return data as GetMaterialResponse[];
};

export const getMaterialById = async (id: string) => {
  const data = await fetcher("/api/material?id=" + id);
  return data;
};

export const patchSupplier = async (payload: GetSupplierResponse) => {
  const data = await fetcher("/api/supplier/" + payload.id, {
    method: "PATCH",
    body: JSON.stringify({
      name: payload.name,
      cnpj: payload.cnpj,
      status: payload.status,
      observations: payload.observations,
    }),
  });

  return data;
};

export const getSuppliers = async () => {
  const data = await fetcher("/api/supplier");
  return data as GetSupplierResponse[];
};

export const getSupplierById = async (id: string) => {
  const data = await fetcher("/api/supplier?id=" + id);
  return data as GetSupplierResponse;
};
