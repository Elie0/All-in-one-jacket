import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fall-data',
  templateUrl: './falldata.component.html',
  styleUrls: ['./falldata.component.css']
})
export class FalldataComponent {
  selectedStartDate: any;
  selectedEndDate: any;
  fallsCount: any;

  constructor(private http: HttpClient) {}

  bothDatesSelected: boolean = false;


  onStartDateChange(event: any): void {
    this.selectedStartDate = new Date(event.value);
    console.log(this.selectedStartDate.toISOString())
    console.log("start",this.selectedStartDate.toISOString().slice(0, 10))
  
    this.selectedStartDate =this.selectedStartDate.toISOString().slice(0, 10)
    this.checkBothDatesSelected();
  
  }

  onEndDateChange(event: any): void {
    this.selectedEndDate = new Date(event.value);
    console.log(this.selectedEndDate.toISOString())
    console.log("end",this.selectedEndDate.toISOString().slice(0, 10))
    
    this.selectedEndDate = this.selectedEndDate.toISOString().slice(0, 10)
    this.checkBothDatesSelected();

  }

  fetchFallsCount(): void {
    const startDateStr = this.selectedStartDate;
    const endDateStr = this.selectedEndDate;
    const apiUrl = `http://localhost:3000/api/ReadFall/${startDateStr}/${endDateStr}`;
    console.log(apiUrl)

    this.http.get<any[]>(apiUrl).subscribe(data => {
      console.log(data)
      this.fallsCount = data.length;
    });
  }

  checkBothDatesSelected(): void {
    this.bothDatesSelected = this.selectedStartDate && this.selectedEndDate;
  }

}
