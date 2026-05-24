import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { PersonajesComponent } from './app/features/personajes/personajes.component';
import { SolicitudesComponent } from './app/features/solicitudes/solicitudes.component';

const routes: Routes = [
  { path: '', redirectTo: 'personajes', pathMatch: 'full' },
  { path: 'personajes', component: PersonajesComponent },
  { path: 'solicitudes', component: SolicitudesComponent }
];

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideRouter(routes)]
}).catch(err => console.error(err));
