// src/Modules/GoTransit/Trips.ts
import { IsDate, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GoTransitUnionDepartureStop {
  @Type(() => String)
  @IsString()
  public Name: string;

  public Code: string | null;
}

export class GoTransitUnionDepartureTrip {
  @Type(() => String)
  @IsString()
  public Info: string;

  @Type(() => Number)
  @IsNumber()
  public TripNumber: number;

  @Type(() => String)
  @IsString()
  public Platform: string;

  @Type(() => String)
  @IsString()
  public Service: string;

  @Type(() => String)
  @IsString()
  public ServiceType: string;

  @Type(() => Date)
  @IsDate()
  public Time: Date;

  @Type(() => GoTransitUnionDepartureStop)
  public Stops: GoTransitUnionDepartureStop[];
}
