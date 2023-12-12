import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EcgplotsService } from 'app/ecgplots.service';
import { Chart } from 'chart.js/auto';


@Component({
 selector: 'app-ecgplots',
 templateUrl: './ecgplots.component.html',
 styleUrls: ['./ecgplots.component.css']
})

export class EcgplotsComponent implements OnInit {

 names: string[] = [];
 showModal: boolean = false;
 selectedName: string = '';
 chart: any;

 constructor(private service: EcgplotsService,private http:HttpClient) {}

 ngOnInit(): void {
    this.service.getNames().subscribe(
      (data: any) => {
        this.names = data;
      }
    );
 }

 openModal(name: string): void {
    this.showModal = true;
    this.selectedName = name;
    this.plotChart(name);
 }

 closeModal(): void {
    this.showModal = false;
    this.chart.destroy();
 }

 plotChart(name: string): void {
    this.service.getPoints(name).subscribe(
      (data: any) => {
        //console.log(data)
        this.chart = new Chart('EChart', {
          type: 'line',
          data: {
            labels: data.map((point:any)=>point.timestamp),
            datasets: [
              {
                label: 'ECG Values',
                data: data.map((point:any)=>point.ecgVal),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
              },
            ],
          },
          options: {
            aspectRatio: window.innerWidth < 768 ? 1 : 3,  
            responsive:true,
          },
        });
      }
    );
 }
}