import { Component, OnInit, OnDestroy } from '@angular/core';
import { EcgDataService } from 'app/ecg-data.service';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { Subscription, interval } from 'rxjs';
import sweetAlert from 'sweetalert2';
import { environment } from 'Environments/environment';
import { takeWhile,switchMap,filter,repeat } from 'rxjs/operators';
@Component({
  selector: 'app-ecg-plot',
  templateUrl: './ecg-plot.component.html',
  styleUrls: ['./ecg-plot.component.css']
})
export class EcgPlotComponent implements OnInit, OnDestroy {
  public chart: any;
  public stopRefresh = false; // Flag to control refreshing
  points: any[] = [];
  dataSubscription: Subscription | undefined;

  constructor(private data: EcgDataService,private http:HttpClient) {}

  ngOnInit(): void {
    this.createChart();
    this.startDataRefresh();
  }

  startDataRefresh(): void {
    this.dataSubscription = interval(500)
      .pipe(
        switchMap(() => this.data.getDataSocket()),
        takeWhile(() => !this.stopRefresh),
        filter(() => !this.stopRefresh),
        repeat()
      )
      .subscribe((data: any) => {
        this.points = data;
        this.updateChart();
      });
  }

  stop  (): void {
    this.stopRefresh = !this.stopRefresh;
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: this.points.map((point) => point.timestamp),
        datasets: [
          {
            label: 'ECG Values',
            data: this.points.map((point:any)=>point.ecgval),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
      },
      options: {
        aspectRatio: window.innerWidth < 768 ? 1 : 3,  // depending on pixels of dev
        responsive:true,
      },
      
      
    });
  }

  updateChart() {
    if (this.chart) {
      this.chart.data.labels = this.points.map(point => point.timestamp);
      this.chart.data.datasets[0].data = this.points.map(point => point.ecgVal);
      this.chart.update();
    }
  }


  exportChart(): void {
    if (this.chart) {
      const base64Image = this.chart.toBase64Image();
      const link = document.createElement('a');
      link.href = base64Image;
      link.download = 'chart.png';
      link.click();
    }
  }

  SaveChartdb(): void {
    const pointsToSend = this.points;
    const chartName = prompt('Enter a name for this chart:'); 

    if (chartName) {
      this.http.post(`${environment.apiUrl}/api/SaveECG`, { name: chartName, points: pointsToSend }).subscribe(
        (response: any) => {
          if (response.success) {
            console.log('Chart saved successfully:', response);
            sweetAlert.fire({
              title: 'Success!',
              text: 'Chart saved successfully!',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          } else if(!response.success) {
            alert(response.error);
          }
        },
        (error) => {
          sweetAlert.fire({
            title: 'Failed!',
            text: `Chart Failed to save! `,
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error('Error saving chart:', error);
        }
      );
    } else {
      console.log('User canceled chart save.');
    }
 }
}
  
  








