import { ServicesProtected } from '../baseProtected';
import * as T from './types';

export class AuthServicesProtected extends ServicesProtected {
  constructor(
    public refreshToken: string,
    public headers?: Record<string, string>
  ) {
    super('http://localhost:4000/api/customer', refreshToken, {
      ...headers,
    });
  }

  async all() {
    return await this._instance.get<T.AllResponse>('/all');
  }
  async aggregate() {
    return await this._instance.get<T.AggregateResponse>('/aggregate');
  }
}
