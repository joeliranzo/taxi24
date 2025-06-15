import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('TripController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/trips/active (GET)', () => {
    return request(app.getHttpServer())
      .get('/trips/active')
      .expect(200);
  });

  it('/trips (POST)', async () => {
    // You need a valid passengerId and startLat/startLng for this test
    const passengers = await request(app.getHttpServer()).get('/passengers');
    const passenger = passengers.body[0];
    const res = await request(app.getHttpServer())
      .post('/trips')
      .send({ passengerId: passenger.id, startLat: passenger.latitude, startLng: passenger.longitude })
      .expect(201);
    expect(res.body.id).toBeDefined();
  });

  it('/trips/:id/complete (PUT)', async () => {
    const trips = await request(app.getHttpServer()).get('/trips/active');
    const trip = trips.body[0];
    if (trip) {
      await request(app.getHttpServer())
        .put(`/trips/${trip.id}/complete`)
        .expect(200);
    }
  });

  afterAll(async () => {
    await app.close();
  });
});
