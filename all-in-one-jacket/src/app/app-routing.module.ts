import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { OxyHeartComponent } from './oxy-heart/oxy-heart.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EcgPlotComponent } from './ecg-plot/ecg-plot.component';
import { FalldataComponent } from './falldata/falldata.component';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent, // Use the layout component as the wrapper
    children: [
      { path: 'temperature', component: TemperatureComponent },
      { path: '', component: HomePageComponent },
      { path: 'home', component: HomePageComponent },
      { path: 'test', component: OxyHeartComponent },
      { path: 'heart', component: EcgPlotComponent },
      { path: 'fallData', component: FalldataComponent }
      // Other routes within the layout
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}