import { AxiosRequestConfig } from 'axios';
import { ServicesProtected } from '../baseProtected';
import * as T from './types';

export class CustomerServicesProtected extends ServicesProtected {
  constructor(
    public refreshToken: string,
    public headers?: Record<string, string>
  ) {
    super('http://localhost:4000/api/customer', refreshToken, {
      ...headers,
    });
  }

  async all() {
    return await this._instance.post<T.AllResponse>('/all');
  }
  async aggregate() {
    return await this._instance.get<T.AggregateResponse>('/aggregate');
  }

  async create(body: T.CreatePayload, config?: AxiosRequestConfig<any>) {
    return await this._instance.post<T.CreateResponse>('/create', body, config);
  }
  async update(body: T.UpdatePayload,id:string ,config?: AxiosRequestConfig<any>){
    return await this._instance.post<T.UpdateResponse>(`/update/:id?id=${id}`, body, config)
  }
}
