import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { PagedResult, Personaje } from "./api.models";

@Injectable({ providedIn: "root" })
export class PersonajesService {
  private readonly baseUrl = `${environment.apiUrl}/personajes`;

  constructor(private readonly http: HttpClient) {}

  importar(
    nombre: string,
    page: number,
    maxPages: number,
  ): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/Importar`, {
      nombre,
      page,
      maxPages,
    });
  }

  getPaged(
    nombre = "",
    estado = "",
    page = 10,
    pageSize = 5,
  ): Observable<PagedResult<Personaje>> {
    let params = new HttpParams().set("page", page).set("pageSize", pageSize);

    if (nombre) params = params.set("nombre", nombre);
    if (estado) params = params.set("estado", estado);

    return this.http.get<PagedResult<Personaje>>(`${this.baseUrl}/GetAll`, {
      params,
    });
  }
}
