import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudesService } from '../../core/services/solicitudes.service';
import { Solicitud } from '../../core/services/api.models';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="card">
      <h2>Nueva solicitud</h2>

      <form class="form-grid" (ngSubmit)="create()">
        <label>
          ID personaje
          <input type="number" [(ngModel)]="form.personajeId" name="personajeId" required />
        </label>

        <label>
          Solicitante
          <input [(ngModel)]="form.solicitante" name="solicitante" required />
        </label>

        <label>
          Evento
          <input [(ngModel)]="form.evento" name="evento" required />
        </label>

        <label>
          Fecha evento
          <input type="date" [(ngModel)]="form.fechaEvento" name="fechaEvento" required />
        </label>

        <button type="submit" [disabled]="loading">Crear solicitud</button>
      </form>
    </section>

    <section class="card">
      <h2>Solicitudes</h2>
      <div class="form-grid">
        <label>
          Estado
          <select [(ngModel)]="estadoFiltro">
            <option value="">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="EnProceso">EnProceso</option>
            <option value="Aprobada">Aprobada</option>
            <option value="Rechazada">Rechazada</option>
          </select>
        </label>

        <label>
          Solicitante
          <input [(ngModel)]="solicitanteFiltro" placeholder="Nombre solicitante" />
        </label>

        <button type="button" (click)="load()">Buscar</button>
      </div>
    </section>

    <div *ngIf="message" class="message" [class.error]="isError">{{ message }}</div>

    <section class="card">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Personaje</th>
            <th>Solicitante</th>
            <th>Evento</th>
            <th>Estado</th>
            <th>Cambiar estado</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let solicitud of solicitudes">
            <td>{{ solicitud.id }}</td>
            <td>{{ solicitud.personajeNombre || solicitud.personajeId }}</td>
            <td>{{ solicitud.solicitante }}</td>
            <td>{{ solicitud.evento }}</td>
            <td><span class="badge">{{ solicitud.estado }}</span></td>
            <td>
              <select #nuevoEstado>
                <option value="EnProceso">EnProceso</option>
                <option value="Aprobada">Aprobada</option>
                <option value="Rechazada">Rechazada</option>
              </select>
              <button type="button" (click)="updateEstado(solicitud.id, nuevoEstado.value)">Actualizar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  `
})
export class SolicitudesComponent implements OnInit {
  solicitudes: Solicitud[] = [];
  loading = false;
  message = '';
  isError = false;
  estadoFiltro = '';
  solicitanteFiltro = '';

  form = {
    personajeId: 1,
    solicitante: '',
    evento: '',
    fechaEvento: ''
  };

  constructor(private readonly solicitudesService: SolicitudesService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.message = '';

    this.solicitudesService.getPaged(this.estadoFiltro, this.solicitanteFiltro).subscribe({
      next: result => {
        this.solicitudes = result.items ?? [];
        this.loading = false;
      },
      error: err => this.showError(err)
    });
  }

  create(): void {
    this.loading = true;
    this.message = '';

    this.solicitudesService.create({
      personajeId: Number(this.form.personajeId),
      solicitante: this.form.solicitante,
      evento: this.form.evento,
      fechaEvento: new Date(this.form.fechaEvento).toISOString()
    }).subscribe({
      next: () => {
        this.message = 'Solicitud creada correctamente.';
        this.isError = false;
        this.form.solicitante = '';
        this.form.evento = '';
        this.load();
      },
      error: err => this.showError(err)
    });
  }

  updateEstado(id: number, nuevoEstado: string): void {
    this.solicitudesService.updateEstado(id, { nuevoEstado }).subscribe({
      next: () => {
        this.message = 'Estado actualizado correctamente.';
        this.isError = false;
        this.load();
      },
      error: err => this.showError(err)
    });
  }

  private showError(err: any): void {
    this.loading = false;
    this.isError = true;
    this.message = err?.error?.message ?? 'No fue posible procesar la solicitud.';
  }
}
