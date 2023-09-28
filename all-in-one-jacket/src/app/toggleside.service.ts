import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TogglesideService {

  private _sidebarOpen = new BehaviorSubject<boolean>(false);

  get sidebarOpen() {  // this is a getter to access my private behaviorsubject
    return this._sidebarOpen.asObservable();
  }
  toggleSidebar() {
    this._sidebarOpen.next(!this._sidebarOpen.value);
  }

  constructor() { }
}
