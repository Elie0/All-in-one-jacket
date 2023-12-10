import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

 // private apiUrl = 'http://192.168.1.5:3000/api/temperature';
  //private apiUrl = 'https://data-server.cyclic.cloud/api/temperature';

  constructor(private http: HttpClient,private socket: Socket) { }
  // getTemperature(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl);
  // }

  getTemperatureSocket(): Observable<any> {
    return this.socket.fromEvent('TempUpdate');
  }
}
