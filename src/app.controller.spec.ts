import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiStateController } from './app.controller';
const { NODE_ENV, ENV_EMOJI } = process.env;

describe('AppController', () => {
  let appController: ApiStateController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiStateController],
    }).compile();

    appController = app.get<ApiStateController>(ApiStateController);
  });

  describe('Base URL', () => {
    it(`should return "Api Status!"`, () => {
      expect(appController.apiStatus()).toMatchObject({
        status: HttpStatus.OK,
        message: `Urbanoverstock Backend ${NODE_ENV} APIs Running!!! ${ENV_EMOJI}`,
      });
    });
  });
});
