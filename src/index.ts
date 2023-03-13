// src/index.ts
import 'reflect-metadata';
import { CONFIG } from './Library/Config';
import { logger, LogMode } from './Library/Logger';
import { GoTransit } from './Modules/GoTransit';
import { sayHello } from './Utils/sayHello';

logger.log(LogMode.INFO, `Starting TransitRouting`);

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

await sayHello('K-FOSS');

export {};
