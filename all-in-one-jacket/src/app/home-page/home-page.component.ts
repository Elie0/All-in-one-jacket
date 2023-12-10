import { Component, OnInit } from '@angular/core';
import { TemperatureService } from '../temperature.service';
import { TogglesideService } from 'app/toggleside.service';
import { NotificationService } from 'app/notification.service';
import { Subject, Subscription } from 'rxjs';
import { OxyHeartService } from 'app/oxy-heart.service';
//import { RoomtempService } from 'app/roomtemp.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  deferredPrompt: any;
  isPhoneScreen: any;
  notif:any = 0;
  private sidebarSubscription: Subscription | undefined;
  OxyHeart: any = '';
  panelOpenState = false;
  panel1OpenState = false;
  panel2OpenState = false;
  isSidebarOpen = false;
  Temp: string = 'Loading...';
  Tempsocket: string = 'Loading...';
  RoomTempSocket: string = 'Loading...';
  private destroy$: Subject<void> = new Subject();
  isAppInstalled: any;

  constructor(
    private TempService: TemperatureService,
    //private roomTemp: RoomtempService,
    private sidebarService: TogglesideService,
    private ox: OxyHeartService,
    private notification:NotificationService
  ) {}

  ngOnInit(): void {
    
    
    if (localStorage.getItem('flag') === null || localStorage.getItem('flag') === '1')
    {
      console.log('true')
      this.notification.requestNotificationPermission();
      localStorage.setItem('flag','0')
    }

    // Check if the app is already installed
    this.isAppInstalled = window.matchMedia('(display-mode: standalone)').matches;

    // Add event listener for successful app installation
    window.addEventListener('appinstalled', () => {
      this.isAppInstalled = true;
    });

    // If the app is not installed, add event listener for install prompt
    if (!this.isAppInstalled) {
      window.addEventListener('beforeinstallprompt', (e: any) => {
        e.preventDefault();
        this.deferredPrompt = e;
      });
    }

    this.isPhoneScreen = window.innerWidth < 768;

    this.ox.getMessage().subscribe((message: any) => {
      this.OxyHeart = message;
    });

    this.TempService.getTemperatureSocket().subscribe((message: any) => {
      if(message)
      {
        localStorage.setItem('Tempsocket', this.Tempsocket);
        localStorage.setItem('RoomTempSocket', this.RoomTempSocket);
      }
      
      this.Tempsocket = localStorage.getItem('Tempsocket') || 'Loading...';
      this.RoomTempSocket = localStorage.getItem('Tempsocket')|| 'Loading...d';
      console.log(this.Tempsocket)
    });

  
    // this.roomTemp.getMessage().subscribe((m:any)=>{
    //   this.RoomTempSocket = m;
    // })

    this.sidebarSubscription = this.sidebarService.sidebarOpen.subscribe(
      (isOpen) => {
        this.isSidebarOpen = isOpen;
      }
    );


  }

  installApp() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        console.log('Choice Result:', choiceResult.outcome);
        if (choiceResult.outcome === 'accepted') {
          this.isAppInstalled = true;
          console.log('User accepted the install prompt');
        }
        this.deferredPrompt = null;
      });
    }
  }



subscribeToNotifications() {
  this.notification.subscribeToNotifications();
}


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.sidebarSubscription?.unsubscribe();
  }
}
