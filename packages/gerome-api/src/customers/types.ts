export interface Customer {
  _id: string;
  adminId: string;
  name: string;
  email: string;
  phone?: string;
  refUser?: string;
  totalToTake: number;
  totalToGive: number;
  createdAt: string;
  updatedAt: string;
}

export interface AllResponse {
  success: boolean;
  data: {
    customers: Customer[];
    total: number;
  };
}

export interface AggregateResponse {
  success: boolean;
  data: {
    totalToTake: number;
    totalToGive: number;
  };
}
