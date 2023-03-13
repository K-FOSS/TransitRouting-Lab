// src/Library/makeRequest.ts
import got from 'got';
import { CONFIG } from './Config';

export const apiRequest = got.extend({
  prefixUrl: CONFIG.apiURL,

  responseType: 'json',

  searchParams: {
    key: CONFIG.token,
  },
});
