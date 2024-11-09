import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiKey="57d133d9155f450380e550e95b3b73f9";
  endpoint="https://api.covidactnow.org/v2/states.json?apiKey="+this.apiKey;
  county_data="https://api.covidactnow.org/v2/counties.json?apiKey="+this.apiKey;

  constructor(private http:HttpClient) { }

  getData():Observable<any>
  {
    return this.http.get(this.endpoint)
  }

  getStates()
  {
    return this.http.get("assets/states.json")
  }

  getCountryData():Observable<any>
  {
    return this.http.get(this.county_data);
  }
}
