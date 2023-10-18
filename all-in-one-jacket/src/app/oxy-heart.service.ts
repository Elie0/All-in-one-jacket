import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OxyHeartService {
  constructor(private socket: Socket) {}
  getMessage():any {
    return this.socket.fromEvent('dataUpdate');
  }
}