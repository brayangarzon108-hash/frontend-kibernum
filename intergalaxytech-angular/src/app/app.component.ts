import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <header class="topbar">
      <div>
        <h1>IntergalaxyTech</h1>
        <p>Gestión de solicitudes Rick and Morty</p>
      </div>
      <nav>
        <a routerLink="/personajes">Personajes</a>
        <a routerLink="/solicitudes">Solicitudes</a>
      </nav>
    </header>

    <main class="container">
      <router-outlet />
    </main>
  `
})
export class AppComponent {}
