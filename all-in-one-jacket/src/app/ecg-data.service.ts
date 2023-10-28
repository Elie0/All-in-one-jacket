import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class EcgDataService {

  constructor(private http:HttpClient) { }
  getData() {
    return this.http.get('assets/data.json', { responseType: 'text' }).pipe(
      map(data => {
        // Split the data by newline to get an array of JSON objects
        const jsonDataArray = data.trim().split('\n');
        
        // Parse each JSON object in the array
        const parsedData = jsonDataArray.map(jsonString => JSON.parse(jsonString));

        return parsedData;
      })
    );
  }
}



