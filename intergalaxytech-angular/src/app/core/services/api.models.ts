export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface Personaje {
  id: number;
  externalId: number;
  nombre: string;
  estado: string;
  especie: string;
  genero: string;
  origen: string;
  imagenUrl: string;
  fechaImport: string;
}

export interface Solicitud {
  id: number;
  idExterno?: string | null;
  personajeId: number;
  personajeNombre?: string | null;
  solicitante: string;
  evento: string;
  fechaEvento: string;
  estado: string;
  fechaCreacion: string;
  fechaActualizacion?: string | null;
}

export interface CreateSolicitudRequest {
  personajeId: number;
  solicitante: string;
  evento: string;
  fechaEvento: string;
}

export interface UpdateEstadoRequest {
  nuevoEstado: string;
  motivo?: string;
}
