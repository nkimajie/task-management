import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import * as momentTimezone from 'moment-timezone';
import { config } from 'dotenv';
import { ApiStateController } from './app.controller';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sequelize_config = require('./config/sequelize.config');
import security_config from 'src/config/security.config';
import global_config from 'src/config/global.config';

import { EventEmitterModule } from '@nestjs/event-emitter';
import { GlobalModule } from './globals/global.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';

config();
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [security_config, global_config],
      isGlobal: true,
      cache: false,
    }),
    SequelizeModule.forRoot(sequelize_config),

    EventEmitterModule.forRoot(),
    AuthModule,
    GlobalModule,
    TasksModule,
    CommentsModule,
  ],
  controllers: [ApiStateController],
  providers: [],
})
export class App_Module implements NestModule {
  constructor() {
    momentTimezone.tz.setDefault('Africa/Lagos'); // Replace with your timezone, e.g., 'America/New_York'
  }
  configure(consumer: MiddlewareConsumer): any {
    // consumer.apply(TimeTakenMiddleware).forRoutes('/');
  }
}
