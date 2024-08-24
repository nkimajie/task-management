import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
import { App_Module } from './../src/app.module';

const { NODE_ENV, ENV_EMOJI } = process.env;

describe('ApiState (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [App_Module],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/v1/status (GET)', () => {
    // return request(app.getHttpServer())
    //   .get('/status')
    //   .expect(200)
    //   .expect({
    //     status: true,
    //     message: `Urbanoverstock Backend ${NODE_ENV} APIs Running!!! ${ENV_EMOJI}`,
    //   });
  });
});
