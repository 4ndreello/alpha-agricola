export type GetSupplierResponse = {
  id: number;
  name: string;
  cnpj: string;
  status: Status;
  observations?: string;
};

export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export type PostStorage = {
  materialId: string;
  type: string;
  quantity: number;
};

export type GetStorageResponse = {
  id: number;
  materialId: string;
  reserved: number;
  available: number;
};

export type GetMaterialResponse = {
  id: number;
  name: string;
  supplierId: string;
  status: Status | string;
  observations?: string;
};
