import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private swRegistration: ServiceWorkerRegistration| undefined;
  readonly  publicKey:string = 'BKyb9hW4_7W3znqT1snpqH4zNFmvdBppRBqIOY-n32t18kyfW7j-RBBINg1yIUI-cPF82UQXnK0tuC_0UDEf2Cg';

  constructor(private swPush: SwPush, private http: HttpClient,private socket:Socket) {
    this.initializePushNotifications();
    
   }

   getMessage():any {
    return this.socket.fromEvent('fall');
  }

   subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.publicKey,
      })
      .then((sub)=>{
        console.log(sub)
        this.sendSubscriptionToServer(sub)
      })
      .catch((error) => {
        console.error('Error subscribing to push notifications:', error);
      });
  }


  private sendSubscriptionToServer(subscription: PushSubscription) {
    console.log('called')
    // Send the subscription to your server using an HTTP request
    this.http.post('https://jackback.onrender.com/api/subscribe', { subscription }).subscribe(
     
      (response) => {
        console.log('Subscription sent to server:', response);
      },
      (error) => {
        console.error('Error sending subscription to server:', error);
      }
    );
  }

   async initializePushNotifications() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        this.swRegistration = await navigator.serviceWorker.register('./ngsw-worker.js');
        console.log('Service Worker registered with scope:', this.swRegistration.scope);
      } catch (error) {
        console.error('Error registering service worker:', error);
      }
    }
  }

  requestNotificationPermission() {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        this.subscribeToNotifications();
      }
    });
  }
  
  displayNotification(title: string, options: NotificationOptions) {
    if (this.swRegistration && this.swRegistration.active) {
      this.swRegistration.showNotification(title, options);
    }
  }

  
}



