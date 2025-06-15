import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('PassengerController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/passengers (GET)', () => {
    return request(app.getHttpServer())
      .get('/passengers')
      .expect(200);
  });

  it('/passengers/:id (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/passengers');
    const id = res.body[0]?.id;
    if (id) {
      await request(app.getHttpServer())
        .get(`/passengers/${id}`)
        .expect(200);
    }
  });

  it('/passengers/:id/nearest-drivers (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/passengers');
    const id = res.body[0]?.id;
    if (id) {
      await request(app.getHttpServer())
        .get(`/passengers/${id}/nearest-drivers?limit=3`)
        .expect(200);
    }
  });

  afterAll(async () => {
    await app.close();
  });
});
