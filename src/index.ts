// src/index.ts
import 'reflect-metadata';
import { CONFIG } from './Library/Config';
import { logger, LogMode } from './Library/Logger';
import { GoTransit } from './Modules/GoTransit';
import { sayHello } from './Utils/sayHello';

logger.log(LogMode.INFO, `Starting TransitRouting`);

// logger.log(LogMode.INFO, `Init iCloud Library`);
// await initiCloud();

// logger.log(LogMode.INFO, `Creating Kristine Entity`);

// const kristine = new User();

// await kristine.findUserNotifyDevice(`Kristine’s Apple Watch`);

// await kristine.notifyUser({
//   subject: 'Platform Assignment',
//   text: 'Platform 6 & 7'
// })

const goAPI = new GoTransit({
  apiURL: CONFIG.apiURL,

  apiToken: CONFIG.token,
});

logger.log(LogMode.INFO, `Making request`);

// const unionDepartures = await goAPI.unionDepartures();

// for (const departure of unionDepartures) {
//   if (departure.Service === 'Kitchener') {
//     if (departure.Platform !== '-') {
//       logger.log(
//         LogMode.DEBUG,
//         `Union Departure to Kitchener at platform`,
//         departure.Platform,
//       );
//     }
//   }
// }

// const trains = await goAPI.getAllTrains();

// for (const train of trains) {
//   if (train.LineCode === 'GT') {
//     logger.log(LogMode.DEBUG, `Trains`, train);
//   }
// }

await sayHello('K-FOSS');

export {};
