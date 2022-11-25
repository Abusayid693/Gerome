import { Error } from '../baseTypes';

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

export interface CreatePayload {
  name: string;
  phone?: string;
  email?: string;
  refUser?: string;
}

export interface CreateResponse {
  success: boolean;
  data: {
    customer: Customer;
  };
  errors: Error;
}


export interface UpdatePayload {
  name?: string;
  phone?: string;
  email?: string;
  refUser?: string;
}

export interface UpdateResponse {
  success: boolean;
  errors: Error;
  data: {
    customer: Customer;
  };
}