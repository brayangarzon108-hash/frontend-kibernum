import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import {
  CreateSolicitudRequest,
  PagedResult,
  Solicitud,
  UpdateEstadoRequest,
} from "./api.models";

@Injectable({ providedIn: "root" })
export class SolicitudesService {
  private readonly baseUrl = `${environment.apiUrl}/Solicitudes`;

  constructor(private readonly http: HttpClient) {}

  getPaged(
    estado = "",
    solicitante = "",
    page = 1,
    pageSize = 10,
  ): Observable<PagedResult<Solicitud>> {
    let params = new HttpParams().set("page", page).set("pageSize", pageSize);

    if (estado) params = params.set("estado", estado);
    if (solicitante) params = params.set("cliente", solicitante);

    return this.http.get<PagedResult<Solicitud>>(`${this.baseUrl}/GetAll`, { params });
  }

  create(request: CreateSolicitudRequest): Observable<Solicitud> {
    return this.http.post<Solicitud>(`${this.baseUrl}/Crear`, request);
  }

  updateEstado(
    id: number,
    request: UpdateEstadoRequest,
  ): Observable<Solicitud> {
    return this.http.patch<Solicitud>(
      `${this.baseUrl}/CambiarEstado/${id}`,
      request,
    );
  }
}
