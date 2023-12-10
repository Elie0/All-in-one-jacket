import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import {map} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class EcgDataService {

  constructor(private http:HttpClient , private socket:Socket) { }
  // getData() {
  //   return this.http.get('assets/data.json', { responseType: 'text' }).pipe(
  //     map(data => {
  //       console.log('Raw JSON data:', data);
  //       // Split the data by newline to get an array of JSON objects
  //       const jsonDataArray = data.trim().split('\n');
        
  //       // Parse each JSON object in the array
  //       const parsedData = jsonDataArray.map(jsonString => JSON.parse(jsonString));

  //       return parsedData;
  //     })
  //   );
  // }

  getDataSocket(): Observable<any[]> {
    return this.socket.fromEvent('ECG').pipe(
      map((data:any) => {
        // Parse each JSON object in the array
        const parsedData = data.map((jsonString:any) => JSON.parse(jsonString));
        console.log(parsedData)
        return parsedData;
      })
    );
  }
}




