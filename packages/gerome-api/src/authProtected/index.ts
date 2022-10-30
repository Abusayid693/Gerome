import { ServicesProtected } from '../baseProtected';

export class AuthServicesProtected extends ServicesProtected {
  constructor(
    public refreshToken: string,
    public headers?: Record<string, string>
  ) {
    super('http://localhost:3000/api/auth/', refreshToken, {
      ...headers,
    });
  }

  async me() {
    return await this._instance.get('/me');
  }
}
