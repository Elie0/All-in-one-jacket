import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { TemperatureComponent } from './app/temperature/temperature.component';
import { HomePageComponent } from './app/home-page/home-page.component';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
