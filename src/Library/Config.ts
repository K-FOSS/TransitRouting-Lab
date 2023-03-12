// src/Library/Config.ts

interface Config {
  apiURL: string;

  token: string;
}

export const CONFIG: Config = {
  apiURL: 'http://api.openmetrolinx.com/OpenDataAPI/api/V1',
  token: process.env.API_TOKEN as string,
};
