import { Component, OnInit } from '@angular/core';
import { OxyHeartService } from 'app/oxy-heart.service';

@Component({
  selector: 'app-oxy-heart',
  templateUrl: './oxy-heart.component.html',
  styleUrls: ['./oxy-heart.component.css']
})
export class OxyHeartComponent implements OnInit {
  data: any;

  constructor(private ox: OxyHeartService) {}

  ngOnInit() {
    this.ox.getMessage().subscribe((message:any) => {
      this.data = message;
    });
  }
}
