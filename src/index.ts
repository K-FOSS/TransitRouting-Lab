// src/index.ts
import 'reflect-metadata';
import { CONFIG } from './Library/Config';
import { iCloudAPI } from './Library/iCloud';
import { logger, LogMode } from './Library/Logger';
import { GoTransit } from './Modules/GoTransit';
import { sayHello } from './Utils/sayHello';

import readline from 'readline/promises';

logger.log(LogMode.INFO, `Starting TransitRouting`);

logger.log(LogMode.INFO, `Logging into iCloud`);

await iCloudAPI.authenticate();

logger.log(LogMode.INFO, `iCloud Status`, iCloudAPI.status);

if (iCloudAPI.status === 'MfaRequested') {
  logger.log(LogMode.INFO, `iCloud needs multifactor`);

  const consoleInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const mfaCode = await consoleInterface.question('Please provide MFA code');
  logger.log(LogMode.DEBUG, `Receieved code ${mfaCode}`);

  logger.log(LogMode.INFO, `Providing MFA to iCloud`);
  await iCloudAPI.provideMfaCode(mfaCode);
}

const goAPI = new GoTransit({
  apiURL: CONFIG.apiURL,

  apiToken: CONFIG.token,
});

logger.log(LogMode.INFO, `Making request`);

const unionDepartures = await goAPI.unionDepartures();

for (const departure of unionDepartures) {
  if (departure.Service === 'Kitchener') {
    if (departure.Platform !== '-') {
      logger.log(
        LogMode.DEBUG,
        `Union Departure to Kitchener at platform`,
        departure.Platform,
      );
    }
  }
}

const trains = await goAPI.getAllTrains();

for (const train of trains) {
  if (train.LineCode === 'GT') {
    logger.log(LogMode.DEBUG, `Trains`, train);
  }
}

await sayHello('K-FOSS');

export {};
