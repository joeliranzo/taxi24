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

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Local PostgreSQL with Docker

You can run a local PostgreSQL instance using Docker. This is the recommended way for local development.

### Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop) installed
- [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) (or npm/yarn)

### Start PostgreSQL

```bash
# Start the PostgreSQL container
$ docker-compose up -d
```

This will start a PostgreSQL server on `localhost:5432` with:
- user: `postgres`
- password: `postgres`
- database: `taxi24`

### Configure Environment

Check your `.env` file and ensure `DATABASE_URL` is set to:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/taxi24"
```

If you use Prisma, you may need to update the connection string accordingly.

### Run Migrations & Seed Data

```bash
# Run Prisma migrations
$ npx prisma migrate dev --name init

# Seed the database (if you have a seed script)
$ npx prisma db seed
```

### Run the App

```bash
$ pnpm install
$ pnpm start:dev
```

---

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

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

### Invoices (Stretch Goal)
- `GET /invoices/trip/{tripId}` — Get invoice for a trip

---

## Database Schema (Prisma)

See `prisma/schema.prisma` for the full schema. Example SQL tables:

```sql
CREATE TABLE "Driver" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  isAvailable BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "Passenger" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "Trip" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driverId UUID REFERENCES "Driver"(id),
  passengerId UUID REFERENCES "Passenger"(id),
  status VARCHAR NOT NULL,
  startLat DOUBLE PRECISION NOT NULL,
  startLng DOUBLE PRECISION NOT NULL,
  endLat DOUBLE PRECISION,
  endLng DOUBLE PRECISION,
  startedAt TIMESTAMP DEFAULT NOW(),
  completedAt TIMESTAMP,
  invoiceId UUID
);

CREATE TABLE "Invoice" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tripId UUID UNIQUE REFERENCES "Trip"(id),
  amount DOUBLE PRECISION NOT NULL,
  issuedAt TIMESTAMP DEFAULT NOW()
);
```

---

## Testing

```bash
# Run all tests
$ pnpm run test

# Run e2e tests
$ pnpm run test:e2e
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
