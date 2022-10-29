import { Error } from '../baseTypes';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    tokenExpires: string;
    refreshToken: string;
  };
  errors: Error;
}

export interface RegisterPayload {
  email: string;
  password: string;
  username: string;
}

export interface RegisterResponse {
  success: boolean;
  data: string;
  errors: Error;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  data: string;
  errors: Error;
}

export interface ResetPasswordPayload {
  password: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  errors: Error;
  data: string;
}
