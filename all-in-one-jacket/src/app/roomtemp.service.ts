import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class RoomtempService {

  constructor(private socket: Socket) {}
  getMessage():any {
    return this.socket.fromEvent('roomtempUpdate');
  }
}
