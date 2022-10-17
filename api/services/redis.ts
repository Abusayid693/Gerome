import * as Sentry from '@sentry/node';
import {createClient} from 'redis';

class RedisServices {
  public _client;
  constructor() {
    this._client = createClient();
    this._client.on('error', error => {
      console.log('[Error]: Redis Client Error', error);
      Sentry.captureException(`Error occoured at ${__filename}.redisClient: ${error}`);
    });

    this._client.on('ready', () => {
      console.log('[Running]: Redis Client successfully connected');
    });
  }

  async set({key, value}: {key: string; value: string}) {
    await this._client.connect();
    await this._client.set(key, value);
    await this._client.disconnect();
  }

  async get({key}: {key: string}) {
    await this._client.connect();
    const result = await this._client.get(key);
    await this._client.disconnect();
    return result;
  }
}

export default new RedisServices();
