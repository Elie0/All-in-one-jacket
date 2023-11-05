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
      .then((sub)=>this.sendSubscriptionToServer(sub))
      .catch((error) => {
        console.error('Error subscribing to push notifications:', error);
      });
  }





 pushSubscription()
 {
  if(!this.swPush.isEnabled)
  {
    console.log('Notification is not enabled');
    return;
  }
  this.swPush.requestSubscription({
    serverPublicKey: this.publicKey
  }).then(sub=>console.log(JSON.stringify(sub))).catch(err=>console.log(err))
 }





  private sendSubscriptionToServer(subscription: PushSubscription) {
    // Send the subscription to your server using an HTTP request
    this.http.post('https://backend-wco3.onrender.com/api/subscribe', { subscription }).subscribe(
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
    return Notification.requestPermission();
  }

  displayNotification(title: string, options: NotificationOptions) {
    if (this.swRegistration && this.swRegistration.active) {
      this.swRegistration.showNotification(title, options);
    }
  }

  
}



