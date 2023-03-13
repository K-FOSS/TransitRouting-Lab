// src/Modules/GoTransit/index.ts
import { plainToInstance } from 'class-transformer';
import got, { OptionsOfJSONResponseBody } from 'got';
import { CONFIG } from '../../Library/Config';
import { logger, LogMode } from '../../Library/Logger';
import { AllDeparturesResponse, APIResponse } from './apiTypes';
import { GoTransitTrip } from './Trip';

interface GoTransitConfig {
  apiToken: string;

  apiURL: string;
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

  public async unionDepartures(): Promise<GoTransitTrip[]> {
    const response = await this.makeRequest<AllDeparturesResponse>(
      'ServiceUpdate/UnionDepartures/All',
    );

    return plainToInstance(GoTransitTrip, response.AllDepartures.Trip);
  }
}
