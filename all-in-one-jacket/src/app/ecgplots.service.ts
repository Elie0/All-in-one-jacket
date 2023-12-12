import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EcgplotsService {

  constructor(private http:HttpClient) { }

  getNames(): Observable<any> {
    console.log("Reach")
    return this.http.get(`${environment.apiUrl}/api/GetAllSavedECGNames`).pipe(
       map((data: any) => {
         return data;
       })
    );
   }

   getPoints(name:string): Observable<any> {
    console.log("Reach")
    return this.http.get(`${environment.apiUrl}/api/GetSavedECG/?name=${name}`).pipe(
       map((data: any) => {
         return data;
       })
    );
   }

}