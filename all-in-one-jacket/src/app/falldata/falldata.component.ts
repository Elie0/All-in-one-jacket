import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap ,finalize} from 'rxjs/operators';
import { environment } from '../../Environments/environment';


@Component({
  selector: 'app-fall-data',
  templateUrl: './falldata.component.html',
  styleUrls: ['./falldata.component.css']
})
export class FalldataComponent {
  selectedStartDate: any;
  selectedEndDate: any;
  fallsCount: any;
  FallsData:any=[];
  loading:boolean = false;
  GetTable:boolean = false;

  constructor(private http: HttpClient) {}

  bothDatesSelected: boolean = false;


  onStartDateChange(event: any): void {
    this.selectedStartDate = new Date(Date.UTC(event.value.getFullYear(), event.value.getMonth(), event.value.getDate()));
    console.log(this.selectedStartDate.toISOString())
    console.log("start",this.selectedStartDate.toISOString().slice(0, 10))
  
    this.selectedStartDate =this.selectedStartDate.toISOString().slice(0, 10)
    this.checkBothDatesSelected();
  
  }

  onEndDateChange(event: any): void {
    this.selectedEndDate = new Date(Date.UTC(event.value.getFullYear(), event.value.getMonth(), event.value.getDate()));
    console.log(this.selectedEndDate.toISOString())
    console.log("end",this.selectedEndDate.toISOString().slice(0, 10))
    
    this.selectedEndDate = this.selectedEndDate.toISOString().slice(0, 10)
    this.checkBothDatesSelected();

  }

  fetchFallsCount(): void {
    this.loading = true;
    this.FallsData = ''
    const startDateStr = this.selectedStartDate;
    const endDateStr = this.selectedEndDate;
    //const apiUrl = `http://localhost:3000/api/ReadFall/${startDateStr}/${endDateStr}`;
    const apiUrl = `${environment.apiUrl}/api/ReadFall/${startDateStr}/${endDateStr}`;
    console.log(apiUrl)

    this.http.get<any[]>(apiUrl).pipe(

      tap((data)=>{

        console.log(data)
        
      }),
      finalize(()=>{
                this.loading = false;
      }),
      catchError(error=>{
            console.log(error)
            return (error)
      })
    ).subscribe(data => {
      this.FallsData = data;
      this.GetTable = true;
    });
  }

  checkBothDatesSelected(): void {
    this.bothDatesSelected = this.selectedStartDate && this.selectedEndDate;
  }

}
