export type GetSupplierResponse = {
  id: number;
  name: string;
  cnpj: string;
  status: SupplierStatus;
};

export enum SupplierStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}
