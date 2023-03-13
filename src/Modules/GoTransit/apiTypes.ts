// src/Modules/GoTransit/apiTypes.ts

import { GoTransitTrip } from './Trip';

interface APIMetadata {
  TimeStamp: string;

  ErrorCode: string;

  ErrorMessage: string;
}

export interface APIResponse {
  Metadata: APIMetadata;
}

export interface Departure {
  Trip: GoTransitTrip[];
}

export interface AllDeparturesResponse extends APIResponse {
  AllDepartures: Departure;
}
