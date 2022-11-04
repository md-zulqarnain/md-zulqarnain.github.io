import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  public getTimeByMonth(month:any): Observable<any> {
      return this.http.get(`./assets/data/${month}.json`);
  }
}
