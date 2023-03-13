// src/Modules/GoTransit/index.ts
import { plainToInstance } from 'class-transformer';
import got, { OptionsOfJSONResponseBody } from 'got';
import { CONFIG } from '../../Library/Config';
import { logger, LogMode } from '../../Library/Logger';
import { GoTransitTrainTrip } from './TrainTrip';
import { GoTransitUnionDepartureTrip } from './UnionDeparture';

interface GoTransitConfig {
  apiToken: string;

  apiURL: string;
}

interface APIMetadata {
  TimeStamp: string;

  ErrorCode: string;

  ErrorMessage: string;
}
interface APIResponse {
  Metadata: APIMetadata;
}

export class GoTransit {
  private config: GoTransitConfig = {
    apiToken: CONFIG.token,
    apiURL: CONFIG.apiURL,
  };

  public constructor(config: GoTransitConfig) {
    this.config = config;
  }

  private apiClient = got.extend({
    prefixUrl: this.config.apiURL,

    responseType: 'json',

    searchParams: {
      key: this.config.apiToken,
    },
  });

  private async makeRequest<ResponseType extends APIResponse>(
    url: string,
    options?: OptionsOfJSONResponseBody,
  ): Promise<ResponseType> {
    const request = await this.apiClient<ResponseType>(url, options);

    if (request.body.Metadata.ErrorCode !== '200') {
      logger.log(
        LogMode.WARN,
        `Response to request ${url} has returned non 200`,
      );

      // TODO: Add in proper error handling and checking
    }

    return request.body;
  }

  public async unionDepartures(): Promise<GoTransitUnionDepartureTrip[]> {
    const response = await this.makeRequest<
      APIResponse & { AllDepartures: { Trip: GoTransitUnionDepartureTrip[] } }
    >('ServiceUpdate/UnionDepartures/All');

    return plainToInstance(
      GoTransitUnionDepartureTrip,
      response.AllDepartures.Trip,
    );
  }

  public async getAllTrains(): Promise<GoTransitTrainTrip[]> {
    const response = await this.makeRequest<
      APIResponse & { Trips: { Trip: GoTransitUnionDepartureTrip[] } }
    >('ServiceataGlance/Trains/All');

    return plainToInstance(GoTransitTrainTrip, response.Trips.Trip);
  }
}
