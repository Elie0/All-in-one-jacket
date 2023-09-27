import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  private apiUrl = 'http://192.168.1.5:3000/api/temperature';

  constructor(private http: HttpClient) { }
  getTemperature(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
