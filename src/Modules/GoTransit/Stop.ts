// src/Modules/GoTransit/Stops.ts
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export enum GoTransitStopType {
  BUS = 'Bus Stop',
  TRAIN = 'Train Station',
  TRAINBUS = 'Train & Bus Station',
  BUSTERMINAL = 'Bus Terminal',
  PARKNRIDE = 'Park & Ride'
}

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
}
