import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent, // Use the layout component as the wrapper
    children: [
      { path: 'temperature', component: TemperatureComponent },
      { path: '', component: HomePageComponent },
      { path: 'home', component: HomePageComponent },
      // Other routes within the layout
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}