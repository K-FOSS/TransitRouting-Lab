// src/Modules/GoTransit/Stops.ts
import { TransformPlainToInstance, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { Container, Service } from 'typedi';
import { APIResponse, GoTransit } from '..';
import { GoTransitNextService } from '../Service';
import { GoTransitStopDetails } from './StopDetails';

export enum GoTransitStopType {
  BUS = 'Bus Stop',
  TRAIN = 'Train Station',
  TRAINBUS = 'Train & Bus Station',
  BUSTERMINAL = 'Bus Terminal',
  PARKNRIDE = 'Park & Ride',
}

@Service()
export class GoTransitStop {
  @Type(() => String)
  @IsString()
  public LocationCode: string;

  @Type(() => String)
  @IsString()
  public LocationName: string;

  @Type(() => String)
  @IsString()
  public PublicStopId: string;

  public LocationType: GoTransitStopType;

  @TransformPlainToInstance(GoTransitStopDetails)
  public async getStopDetails(): Promise<GoTransitStopDetails> {
    const goAPI = Container.get<GoTransit>('transitAPI');

    const { Stop } = await goAPI.makeRequest<
      APIResponse & { Stop: GoTransitStopDetails }
    >(`Stop/Details/${this.LocationCode}`);

    return Stop;
  }

  @TransformPlainToInstance(GoTransitNextService)
  public async getNextService(): Promise<GoTransitNextService[]> {
    const goAPI = Container.get<GoTransit>('transitAPI');

    const {
      NextService: { Lines },
    } = await goAPI.makeRequest<
      APIResponse & { NextService: { Lines: GoTransitNextService[] } }
    >(`Stop/NextService/${this.LocationCode}`);

    return Lines;
  }
}
