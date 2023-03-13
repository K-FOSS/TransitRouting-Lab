// src/Library/iCloud.ts
import iCloud from 'icloudjs';
import { CONFIG } from './Config';
import got from 'got';
import { logger, LogMode } from './Logger';
import readline from 'readline/promises';


export const iCloudAPI = new iCloud({
  ...CONFIG.iCloud,
  trustDevice: true,
});

export async function initiCloud(): Promise<void> {
  logger.log(LogMode.INFO, `Logging into iCloud`);

  await iCloudAPI.authenticate();
  
  logger.log(LogMode.DEBUG, `iCloud Status`, iCloudAPI.status);
  
  if (iCloudAPI.status === 'MfaRequested') {
    logger.log(LogMode.WARN, `iCloud needs multifactor`);
  
    const consoleInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  
    const mfaCode = await consoleInterface.question('Please provide MFA code\n');
    logger.log(LogMode.DEBUG, `Receieved code ${mfaCode}`);
  
    logger.log(LogMode.INFO, `Providing MFA to iCloud`);
    await iCloudAPI.provideMfaCode(mfaCode);
  }
  
  await iCloudAPI.awaitReady;
}

export async function sendAlert(device: string, {
  subject = 'Find My iPhone Alert',
  text = 'Hello World!'
}): Promise<any> {
  if (iCloudAPI.accountInfo) {
    const { findme: { url: prefixUrl } } = iCloudAPI.accountInfo.webservices

    logger.log(LogMode.INFO, `Attempting to send alert`, prefixUrl)

    const api = got.extend({
      headers: iCloudAPI.authStore.getHeaders(),
    })

    return api.post(`${prefixUrl}/fmipservice/client/web/sendMessage`, {
      json: {
        device,
        subject,
        sounds: true,
        userText: true,
        text
      }
    })
  } else {
    throw new Error('iCloud Not Connected')
  }
}