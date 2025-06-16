<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Taxi24 Ride-Hailing Platform

Taxi24 is a white-label ride-hailing platform built as a single NestJS microservice (Node.js + TypeScript) using PostgreSQL (with Prisma ORM). The service exposes REST APIs for managing drivers, passengers, trips, and invoices, following Clean Architecture principles. The codebase is modular, testable, and well-documented.

---

## Getting Started (Step-by-Step Guide)

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [pnpm](https://pnpm.io/) (or npm/yarn)
- [Docker](https://www.docker.com/products/docker-desktop) (for PostgreSQL)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd taxi24
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Start PostgreSQL with Docker
```bash
docker-compose up -d
```
This will start a PostgreSQL server on `localhost:5432` with:
- user: `postgres`
- password: `postgres`
- database: `taxi24`

### 4. Configure Environment Variables
Check your `.env` file and ensure `DATABASE_URL` is set to:
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/taxi24
```

### 5. Run Database Migrations
```bash
pnpm prisma migrate deploy
```

### 6. Seed the Database
```bash
pnpm prisma db seed
```

### 7. Start the Application
```bash
pnpm start:dev
```

### 8. Run Tests
```bash
pnpm run test         # Unit tests
pnpm run test:e2e     # End-to-end tests
```

---

## REST API Endpoints

### Drivers
- `GET /drivers` — List all drivers
- `GET /drivers/available` — List available drivers
- `GET /drivers/nearby?lat={lat}&lng={lng}&radius=3` — List available drivers within 3km of a location
- `GET /drivers/{driverId}` — Fetch a single driver by ID

### Passengers
- `GET /passengers` — List all passengers
- `GET /passengers/{passengerId}` — Fetch a single passenger by ID
- `GET /passengers/{passengerId}/nearest-drivers?limit=3` — Return the three closest drivers to that passenger’s pick-up point

### Trips
- `POST /trips` — Create a new trip, assigning a driver to a passenger
- `PUT /trips/{tripId}/complete` — Complete a trip
- `GET /trips/active` — List all active trips

### Invoices
- `GET /invoices/trip/{tripId}` — Get invoice for a trip

---

## API Documentation (Swagger/OpenAPI)

Interactive API documentation is available via Swagger UI:

- Visit [http://localhost:3000/api](http://localhost:3000/api) after starting the app.
- All endpoints, request/response schemas, and DTOs are documented automatically.

---

## Project Structure

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

## Database Schema (Prisma, snake_case)

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

## Seed Data

Demo data is automatically seeded for drivers, passengers, trips y invoices. You can edit or extend the seed logic in `prisma/seed.ts`.

---

## Error Handling

- 404 Not Found: Returned if a resource (e.g., trip, driver) does not exist.
- 400 Bad Request: Returned for invalid input or validation errors.
- 500 Internal Server Error: Returned for unexpected server errors.

---

## Testing

```bash
# Run all tests
pnpm run test

# Run e2e tests
pnpm run test:e2e
```

---

## Design Decisions
- Clean Architecture: domain, application, infrastructure, presentation layers
- Prisma ORM for type-safe DB access
- Modular, testable code (DTOs, services, repositories)
- Geospatial queries use Haversine formula in raw SQL for driver proximity
- Invoice is generated automatically when a trip is completed
- Seed data covers all use cases

---

## Contributing

Contributions are welcome! Please fork the repo and submit a pull request. For major changes, open an issue first to discuss what you would like to change.
