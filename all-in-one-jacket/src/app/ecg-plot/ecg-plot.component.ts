import { Component, OnInit, OnDestroy } from '@angular/core';
import { EcgDataService } from 'app/ecg-data.service';
import Chart from 'chart.js/auto';
import { Subscription, interval } from 'rxjs';

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

  constructor(private data: EcgDataService) {}

  ngOnInit(): void {
    this.createChart();
    this.startDataRefresh();
  }

  startDataRefresh(): void {
    this.dataSubscription = interval(2000)
      .subscribe(() => {
        if (!this.stopRefresh) {
          this.data.getData().subscribe((data: any) => {
            this.points = data;
            this.updateChart();
          });
        }
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
            data: this.points.map((point) => point.ecgVal),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.01,
          },
        ],
      },
      options: {
        aspectRatio: 3
      }
    });
  }

  updateChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.createChart();
  }
}
