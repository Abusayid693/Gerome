import axios, { AxiosInstance } from 'axios';

export class ServicesProtected {
  _instance: AxiosInstance;
  constructor(
    private baseURL: string,
    private _refreshToken: string,
    private _headers?: Record<string, string>
  ) {
    this._instance = axios.create({
      baseURL: this.baseURL,
      headers: {
        ...this._headers,
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    this.initialise();
  }

  private initialise() {
    this._instance.interceptors.request.use(
      async (config) => {
        /**
         * Skip loop
         */
        if (config.url === '/token') return config;
        try {
          const { data }: any = await this._instance.get('/token', {
            headers: {
              refresh: 'Bearer ' + this._refreshToken,
            },
          });

          const access_token = data?.data?.token;
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${access_token}`,
          };
        } catch (error) {
          /**
           * if refresh token is thorwing error logout user
           */
          window.location.replace('/404');
        }

        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
  }
}
