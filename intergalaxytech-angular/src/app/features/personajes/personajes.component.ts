import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PersonajesService } from "../../core/services/personajes.service";
import { Personaje } from "../../core/services/api.models";

@Component({
  selector: "app-personajes",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="card">
      <h2>Personajes</h2>
      <p>
        Importa personajes desde Rick and Morty API y consulta los registros
        locales.
      </p>

      <div class="form-grid">
        <label>
          Nombre
          <input [(ngModel)]="nombre" placeholder="Rick, Morty..." />
        </label>

        <label>
          Estado
          <select [(ngModel)]="estado">
            <option value="">Todos</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">unknown</option>
          </select>
        </label>

        <button type="button" (click)="load()">Buscar</button>
        <button type="button" (click)="importar()" [disabled]="loading">
          Importar personajes
        </button>
      </div>
    </section>

    <div *ngIf="message" class="message" [class.error]="isError">
      {{ message }}
    </div>

    <section class="grid">
      <article class="card character" *ngFor="let personaje of personajes">
        <img [src]="personaje.imagenUrl" [alt]="personaje.nombre" />
        <div class="body">
          <h3>{{ personaje.nombre }}</h3>
          <p>
            <span class="badge">{{ personaje.estado }}</span>
          </p>
          <p>{{ personaje.especie }} · {{ personaje.genero }}</p>
          <small>Origen: {{ personaje.origen }}</small>
        </div>
      </article>
    </section>
  `,
})
export class PersonajesComponent implements OnInit {
  personajes: Personaje[] = [];
  nombre = "";
  estado = "";
  loading = false;
  message = "";
  isError = false;

  constructor(private readonly personajesService: PersonajesService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.message = "";

    this.personajesService.getPaged(this.nombre, this.estado).subscribe({
      next: (result) => {
        this.personajes = result.items ?? [];
        this.loading = false;
      },
      error: (err) => this.showError(err),
    });
  }

  importar(): void {
    this.loading = true;
    this.message = "";

    this.personajesService.importar("", 1, 3).subscribe({
      next: () => {
        this.message = "Personajes importados correctamente.";
        this.isError = false;
        this.load();
      },
      error: (err) => this.showError(err),
    });
  }

  private showError(err: any): void {
    this.loading = false;
    this.isError = true;
    this.message =
      err?.error?.message ?? "No fue posible procesar la solicitud.";
  }
}
