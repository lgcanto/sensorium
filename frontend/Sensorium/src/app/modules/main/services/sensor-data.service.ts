import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SensorData } from '../models/sensor-data';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {

  public apiUrl = `${environment.backendUrl}api/SensorData/`;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<SensorData[]> {
    return this.http.get(`${this.apiUrl}GetAll`).pipe(
      map((res: SensorData[]) => res)
    );
  }

  public getAllNumeric(): Observable<SensorData[]> {
    return this.http.get(`${this.apiUrl}GetAllNumeric`).pipe(
      map((res: SensorData[]) => res)
    );
  }

  public getCountByFilter(filter: string): Observable<SensorData[]> {
    let params: HttpParams = new HttpParams().set('filter', filter);
    return this.http.get(`${this.apiUrl}GetCountByFilter`, {params}).pipe(
      map((res: SensorData[]) => res)
    );
  }
}
