import { AxiosRequestConfig } from 'axios';
import { Services } from '../base';
import * as T from './types';

export class AuthServices extends Services {
  constructor(public headers?: Record<string, string>) {
    super('http://localhost:4000/api/auth/', headers);
  }

  async login(body: T.LoginPayload, config?: AxiosRequestConfig<any>) {
    return await this._instance.post<T.LoginResponse>('/login', body, config);
  }

  async register(body: T.RegisterPayload, config?: AxiosRequestConfig<any>) {
    return await this._instance.post<T.RegisterResponse>(
      '/register',
      body,
      config
    );
  }

  async forgotPassword(
    body: T.ForgotPasswordPayload,
    config?: AxiosRequestConfig<any>
  ) {
    return await this._instance.post<T.ForgotPasswordResponse>(
      '/forgotPassword',
      body,
      config
    );
  }

  async resetPassword(
    resetToken: string,
    body: T.ResetPasswordPayload,
    config?: AxiosRequestConfig<any>
  ) {
    return await this._instance.post<T.ResetPasswordResponse>(
      `/resetpassword/:resetToken?resetToken=${resetToken}`,
      body,
      config
    );
  }
}
