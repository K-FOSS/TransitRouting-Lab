// src/index.ts
import { CONFIG } from './Library/Config';
import { logger, LogMode } from './Library/Logger';
import { apiRequest } from './Library/makeRequest';
import { sayHello } from './Utils/sayHello';

logger.log(LogMode.INFO, `Starting TransitRouting`);

const stuff = await apiRequest('ServiceUpdate/UnionDepartures/All', {
  method: 'GET',
  searchParams: {
    key: CONFIG.token,
  },
});

logger.log(LogMode.INFO, `API: `, stuff.body.AllDepartures);

await sayHello('K-FOSS');

export {};
