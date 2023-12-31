import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule} from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MainComponent } from './main/main.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { OxyHeartComponent } from './oxy-heart/oxy-heart.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { EcgPlotComponent } from './ecg-plot/ecg-plot.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { FalldataComponent } from './falldata/falldata.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { environment } from 'Environments/environment';
import { EcgplotsComponent } from './ecgplots/ecgplots.component';



const config: SocketIoConfig = { url:environment.apiUrl, options: {} };
//const config: SocketIoConfig = { url: 'https://jackback.onrender.com', options: {} };
//const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    HomePageComponent,
    SidebarComponent,
    MainComponent,
    OxyHeartComponent,
    EcgPlotComponent,
    FalldataComponent,
    EcgplotsComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatNativeDateModule,
    AppRoutingModule,
    HttpClientModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule,
    MatChipsModule,
    MatExpansionModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatMenuModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
