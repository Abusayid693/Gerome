import axios, { AxiosInstance } from 'axios';

export class Services {
  _instance: AxiosInstance;
  constructor(
    private _baseURL: string,
    private _headers?: Record<string, string>
  ) {
    this._instance = axios.create({
      baseURL: this._baseURL,
      headers: {
        ...this._headers,
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }
}
