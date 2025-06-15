import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('DriverController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/drivers (GET)', () => {
    return request(app.getHttpServer())
      .get('/drivers')
      .expect(200);
  });

  it('/drivers/available (GET)', () => {
    return request(app.getHttpServer())
      .get('/drivers/available')
      .expect(200);
  });

  it('/drivers/nearby (GET)', () => {
    return request(app.getHttpServer())
      .get('/drivers/nearby?lat=40.7128&lng=-74.0060&radius=3')
      .expect(200);
  });

  it('/drivers/:id (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/drivers');
    const id = res.body[0]?.id;
    if (id) {
      await request(app.getHttpServer())
        .get(`/drivers/${id}`)
        .expect(200);
    }
  });

  afterAll(async () => {
    await app.close();
  });
});
