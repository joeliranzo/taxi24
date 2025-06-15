import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('InvoiceController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/invoices/trip/:tripId (GET)', async () => {
    const trips = await request(app.getHttpServer()).get('/trips/active');
    const trip = trips.body[0];
    if (trip) {
      await request(app.getHttpServer())
        .get(`/invoices/trip/${trip.id}`)
        .expect(200);
    }
  });

  afterAll(async () => {
    await app.close();
  });
});
