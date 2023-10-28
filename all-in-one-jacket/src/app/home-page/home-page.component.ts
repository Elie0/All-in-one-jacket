import { Component,OnInit } from '@angular/core';
import { TemperatureService } from '../temperature.service';
import { TogglesideService } from 'app/toggleside.service';
import { map, switchMap, takeUntil, interval } from 'rxjs';
import { Subject,Subscription } from 'rxjs';
import { OxyHeartService } from 'app/oxy-heart.service';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  private sidebarSubscription: Subscription | undefined;
  OxyHeart:any='';
  panelOpenState = false;
  panel1OpenState = false;
  panel2OpenState = false;
  isSidebarOpen = false;
  Temp: string = 'Loading...';
  Tempsocket: string = 'Loading...';
  private destroy$: Subject<void> = new Subject();

  constructor(private TempService: TemperatureService,private sidebarService: TogglesideService,private ox:OxyHeartService) {}

  ngOnInit(): void {
    this.ox.getMessage().subscribe((message:any) => {
      this.OxyHeart = message;
    });
    this.TempService.getTemperatureSocket().subscribe((message:any)=>{
      this.Tempsocket=message;
    })
    this.sidebarSubscription = this.sidebarService.sidebarOpen.subscribe(
      (isOpen) => {
        this.isSidebarOpen = isOpen;
      }
    );
    interval(3000) // 10 seconds interval
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.TempService.getTemperature()),
        map((data) => data.temp)
      )
      .subscribe((temperature) => {
        this.Temp = temperature;
        console.log('Updated temperature:', this.Temp);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.sidebarSubscription?.unsubscribe(); 
  }
}
