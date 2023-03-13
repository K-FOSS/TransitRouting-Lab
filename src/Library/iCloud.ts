// src/Library/iCloud.ts
import iCloud from 'icloudjs';
import { CONFIG } from './Config';

export const iCloudAPI = new iCloud({
  ...CONFIG.iCloud,
  trustDevice: true,
  saveCredentials: true,
});
