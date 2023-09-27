import { Component, OnInit } from '@angular/core';
import { TemperatureService } from '../temperature.service';
import { map, switchMap, takeUntil, interval } from 'rxjs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {
  Temp: string = '';
  private destroy$: Subject<void> = new Subject();

  constructor(private TempService: TemperatureService) {}

  ngOnInit(): void {
    // Use RxJS interval to make periodic requests (e.g., every 10 seconds)
    interval(2000) // 10 seconds interval
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.TempService.getTemperature()),
        map((data) => data.temp)
      )
      .subscribe((temperature) => {
        this.Temp = temperature;
        console.log('Updated temperature:', this.Temp);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
