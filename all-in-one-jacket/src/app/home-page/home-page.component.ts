import { Component,OnInit } from '@angular/core';
import { TemperatureService } from '../temperature.service';
import { TogglesideService } from 'app/toggleside.service';
import { map, switchMap, takeUntil, interval } from 'rxjs';
import { Subject,Subscription } from 'rxjs';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  private sidebarSubscription: Subscription | undefined;
  panelOpenState = false;
  panel1OpenState = false;
  panel2OpenState = false;
  isSidebarOpen = false;
  Temp: string = '';
  private destroy$: Subject<void> = new Subject();

  constructor(private TempService: TemperatureService,private sidebarService: TogglesideService) {}

  ngOnInit(): void {
    // Use RxJS interval to make periodic requests (e.g., every 10 seconds)
    this.sidebarSubscription = this.sidebarService.sidebarOpen.subscribe(
      (isOpen) => {
        console.log("TEST",isOpen)
        this.isSidebarOpen = isOpen;
      }
    );
    console.log(this.isSidebarOpen)
    interval(2000) // 10 seconds interval
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.TempService.getTemperature()),
        map((data) => data.temp)
      )
      .subscribe((temperature) => {
        this.Temp = temperature;
        console.log('Updated temperature:', this.Temp);
        console.log(this.isSidebarOpen)
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.sidebarSubscription?.unsubscribe(); 
  }
}
