export interface d1 {
  _id: string;
  reason: string;
  amount: string;
  details: string[];
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetResponse {
  success: boolean;
  data: {
    result: d1[];
  };
}

export interface GetPayload {
  limit?: number;
  offset?: number;
}

export interface CreatePayload {
  customerId: string;
  reason: string;
  amount: string;
  details?: string[];
}

export interface CreateResponse {
  success: boolean;
  data: {
    result: d1;
  };
}

export type UpdatePayload = Omit<CreatePayload, 'customerId'>;

export interface UpdateResponse {
  success: boolean;
  data: {
    result: d1;
    message: string;
  };
}
