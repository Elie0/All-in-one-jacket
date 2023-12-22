import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  

  constructor(private http: HttpClient, private socket: Socket) {}

  getTemperatureSocket(): Observable<any> {
    return this.socket.fromEvent('TempUpdate');
  }

  getLastTemperature(): any {
    const storedTemperature = sessionStorage.getItem('temperature');
    return storedTemperature ? JSON.parse(storedTemperature) : '';
  }

  setLastTemperature(data: any): void {
    sessionStorage.setItem('temperature', JSON.stringify(data));
  }
}
