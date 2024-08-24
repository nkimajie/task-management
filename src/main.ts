import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { App_Module } from './app.module';
import * as express from 'express';

(async () => {
  const app = await NestFactory.create(App_Module);
  const configService = app.get(ConfigService);

  const port = configService.get<string>('App.port');
  const env = configService.get<string>('App.node_env');
  const emoji = configService.get<string>('App.env_emoji');

  app.enableCors();
  app.enableCors({
    origin: ['*'],
  });
  app.setGlobalPrefix('api/v1');

  app.use(express.json({ limit: '50mb' }));
  await app.listen(port);
  console.log(`Urbanoverstock Backend ${env} running on ${port}!! ${emoji}`);
})();
