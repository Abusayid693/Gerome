import { ServicesProtected } from '../baseProtected';
import * as T from './types';

export class D1ServicesProtected extends ServicesProtected {
  constructor(
    public refreshToken: string,
    public headers?: Record<string, string>
  ) {
    super('http://localhost:4000/api/d1', refreshToken, {
      ...headers,
    });
  }

  async getByTakeSnapshot(customerId: string, body: T.GetPayload) {
    return await this._instance.post<T.GetResponse>(
      `/get/${customerId}`,
      { ...body, type: 'totalToTake' }
    );
  }

  async getByGiveSnapshot(customerId: string, body: T.GetPayload) {
    return await this._instance.post<T.GetResponse>(
      `/get/${customerId}`,
      { ...body, type: 'totalToGive' }
    );
  }

  async createByTakeSnapshot(body: T.CreatePayload) {
    return await this._instance.post<T.CreateResponse>('/create', {
      ...body,
      type: 'totalToTake',
    });
  }

  async createByGiveSnapshot(body: T.CreatePayload) {
    return await this._instance.post<T.CreateResponse>('/create', {
      ...body,
      type: 'totalToGive',
    });
  }

  async recent(customerId: string, body: T.GetPayload) {
    return await this._instance.post<T.GetResponse>(
      `/recent/${customerId}`,
      body
    );
  }

  async update(id: string, body: T.UpdatePayload) {
    return await this._instance.post<T.UpdateResponse>(
      `/update/${id}`,
      body
    );
  }
}
