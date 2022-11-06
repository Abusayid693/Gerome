import { ServicesProtected } from '../baseProtected';
import * as T from './types';

export class AuthServicesProtected extends ServicesProtected {
  constructor(
    public refreshToken: string,
    public headers?: Record<string, string>
  ) {
    super('http://localhost:4000/api/auth/', refreshToken, {
      ...headers,
    });
  }

  async me() {
    return await this._instance.get<T.MeResponse>('/me');
  }
}
