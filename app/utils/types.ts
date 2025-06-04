export type GetSupplierResponse = {
  id: number;
  name: string;
  cnpj: string;
  status: SupplierStatus;
  observations?: string;
};

export enum SupplierStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}
