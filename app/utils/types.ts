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

export type GetMaterialResponse = {
  id: number;
  name: string;
  supplierId: string;
  status: Status | string;
  observations?: string;
};
