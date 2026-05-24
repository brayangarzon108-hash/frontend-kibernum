# IntergalaxyTech Angular Frontend

Frontend mínimo en Angular 17 para consumir la API .NET 8 de IntergalaxyTech.

## Funcionalidades

- Importar personajes desde la API backend.
- Listar personajes con filtros por nombre y estado.
- Crear solicitudes.
- Listar solicitudes con filtros.
- Cambiar estado de solicitudes.

## Configuración

Edita `src/environments/environment.ts` y ajusta el puerto de tu API:

```ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7164/api'
};
```

## Ejecución

```bash
npm install
npm start
```

Abrir:

```txt
http://localhost:4200
```

## Nota CORS

Si el navegador bloquea las llamadas, habilita CORS en la API .NET:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AngularDev", policy =>
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

app.UseCors("AngularDev");
```
