import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { OxyHeartComponent } from './oxy-heart/oxy-heart.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EcgPlotComponent } from './ecg-plot/ecg-plot.component';
import { FalldataComponent } from './falldata/falldata.component';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent, // Use the layout component as the wrapper
    children: [
      { path: '', component: HomePageComponent },
      { path: 'home', component: HomePageComponent },
      { path: 'heart', component: EcgPlotComponent },
      { path: 'fallData', component: FalldataComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}