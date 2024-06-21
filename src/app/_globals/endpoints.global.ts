import { Injectable } from '@angular/core';
import { ENDPOINTS } from './endpoints';

@Injectable({
  providedIn: 'root',
})
export class Globals {
  private endpoints: any = ENDPOINTS;

  constructor() {}
  /**
   * Basic URL Join
   * Joins Endpoints BaseURL with endpoint
   */
  urlJoin = (category: string, endpoint: string): string => {
    const generatedEndpoint = `${this.endpoints[category][endpoint]}`;
    // console.log(generatedEndpoint);
    return generatedEndpoint;
  };

  urlJoinWithParam = (category: string, endpoint: string, param: string) => {
    const generatedEndpoint = `${this.endpoints[category][endpoint].pathA}${param}${this.endpoints[category][endpoint].pathB}`;
    return generatedEndpoint;
  };
}
