import { Component } from '@angular/core';
import { TogglesideService } from 'app/toggleside.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private sidebarService: TogglesideService) {}
  isOpen = false;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    this.sidebarService.toggleSidebar();
  }

}
