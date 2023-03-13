// src/Library/Config.ts

interface iCloudConfig {
  username: string;

  password: string;
}

interface Config {
  apiURL: string;

  token: string;

  iCloud: iCloudConfig
}

export const CONFIG: Config = {
  apiURL: 'http://api.openmetrolinx.com/OpenDataAPI/api/V1',
  token: process.env.API_TOKEN as string,

  iCloud: {
    username: process.env.ICLOUD_USERNAME as string,
    password: process.env.ICLOUD_PASSWORD as string,
  }
};
