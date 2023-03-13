// src/Modules/GoTransit/Stops.ts
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class GoTransitStop {
  @Type(() => String)
  @IsString()
  public Name: string;

  public Code: string | null;
}
