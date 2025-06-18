# Plataforma de Transporte Taxi24

Taxi24 es una plataforma de transporte marca blanca construida como un solo microservicio en NestJS (**Node.js + TypeScript**) utilizando **PostgreSQL** (con Prisma ORM). El servicio expone APIs REST para gestionar conductores, pasajeros, viajes y facturas, siguiendo principios de Clean Architecture. El código es modular, testeable y bien documentado.

---

## Primeros Pasos (Guía paso a paso)

### Requisitos

- [Node.js](https://nodejs.org/) (v16+ recomendado)
- [pnpm](https://pnpm.io/) (o npm/yarn)
- [Docker](https://www.docker.com/products/docker-desktop) (para PostgreSQL)

### 1. Clonar el Repositorio

```bash
git clone https://github.com/joeliranzo/taxi24
cd taxi24
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Iniciar Postgres con Docker

```bash
docker-compose up -d
```

Esto iniciará un servidor PostgreSQL en `localhost:5432` con:

- usuario: `postgres`
- contrasena: `postgres`
- base de datos: `taxi24`

### 4. Configura las Variables de Entorno

Verifica tu archivo `.env` y asegúrate de que `DATABASE_URL` tenga este valor:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/taxi24
```

### 5. Ejecuta las Migraciones

```bash
pnpm prisma migrate deploy
```

### 6. Llena la Base de Datos (Seed)

```bash
pnpm prisma db seed
```

### 7. Inicia la Aplicación

```bash
pnpm start:dev
```

### 8. Ejecuta las Pruebas

```bash
pnpm run test:e2e
```

---

## Endpoints de la API Rest

### Passengers

### Conductores

* `GET /drivers` — Lista todos los conductores
* `GET /drivers/available` — Lista conductores disponibles
* `GET /drivers/nearby?lat={lat}&lng={lng}&radius=3` — Lista conductores disponibles en 3km de una ubicación
* `GET /drivers/{driverId}` — Consulta un conductor por ID

### Pasajeros

* `GET /passengers` — Lista todos los pasajeros
* `GET /passengers/{passengerId}` — Consulta un pasajero por ID
* `GET /passengers/{passengerId}/nearest-drivers?limit=3` — Devuelve los tres conductores más cercanos al punto de recogida del pasajero

### Viajes

* `POST /trips` — Crea un nuevo viaje, asignando un conductor a un pasajero
* `PUT /trips/{tripId}/complete` — Completa un viaje
* `GET /trips/active` — Lista todos los viajes activos

### Facturas

* `GET /invoices/trip/{tripId}` — Obtiene la factura de un viaje

## Documentación de la API (Swagger/OpenAPI)

Documentación interactiva disponible con Swagger UI:

* Visita [http://localhost:3000/api](http://localhost:3000/api) luego de iniciar la app.
* Todos los endpoints, esquemas de solicitudes/respuestas y DTOs están documentados automáticamente.

---



## Estructura del Proyecto

```
├── src/
│   ├── domain/         # Entities & repositories (domain logic)
│   ├── application/    # Services, DTOs (use cases)
│   ├── infrastructure/ # Prisma repositories (DB access)
│   ├── presentation/   # Controllers (REST API)
│   └── main.ts, app.module.ts, ...
├── prisma/             # Prisma schema, migrations, seed data
├── test/               # e2e and unit tests
├── docker-compose.yml  # PostgreSQL container
└── ...
```

---

## Esquema de Base de Datos (Prisma, snake_case)

See `prisma/schema.prisma` for the full schema. Example tables (snake_case):

```sql
CREATE TABLE driver (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE passenger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE trip (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID REFERENCES driver(id),
  passenger_id UUID REFERENCES passenger(id),
  status VARCHAR NOT NULL,
  start_lat DOUBLE PRECISION NOT NULL,
  start_lng DOUBLE PRECISION NOT NULL,
  end_lat DOUBLE PRECISION,
  end_lng DOUBLE PRECISION,
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  CONSTRAINT fk_driver FOREIGN KEY(driver_id) REFERENCES driver(id),
  CONSTRAINT fk_passenger FOREIGN KEY(passenger_id) REFERENCES passenger(id)
);

CREATE TABLE invoice (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID UNIQUE REFERENCES trip(id),
  amount DOUBLE PRECISION NOT NULL,
  issued_at TIMESTAMP DEFAULT NOW()
);
```

---

Datos de Prueba (Seed)

Se generan automáticamente datos de prueba para conductores, pasajeros, viajes y facturas. Puedes editar o ampliar la lógica en `prisma/seed.ts`.

---

## Manejo de Errores

* **404 No Encontrado:** Se devuelve si un recurso (por ejemplo, viaje o conductor) no existe.
* **400 Solicitud Incorrecta:** Se devuelve para entradas inválidas o errores de validación.
* **500 Error Interno del Servidor:** Se devuelve en caso de errores inesperados del servidor.

---

## Pruebas

```bash
# Run e2e tests
pnpm run test:e2e
```

---

## Decisiones de Diseño

* Arquitectura Limpia: capas de dominio, aplicación, infraestructura y presentación
* Prisma ORM para acceso a BD con tipos seguros
* Código modular y testeable (DTOs, servicios, repositorios)
* Consultas geoespaciales usando fórmula de Haversine en SQL puro
* Las facturas se generan automáticamente al completar un viaje
* Los datos de prueba cubren todos los casos de uso
