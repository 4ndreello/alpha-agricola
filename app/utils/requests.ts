import { GetSupplierResponse } from "./types";

const fetcher = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  return response.json();
};

const generatePostConfig = (body: unknown) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

export const postLogin = async (email: string, password: string) => {
  const data = await fetcher(
    "/api/pub/login",
    generatePostConfig({ email, password })
  );

  return data;
};

export const getSuppliers = async () => {
  const data = await fetcher("/api/supplier");
  return data as GetSupplierResponse[];
};
