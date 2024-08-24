import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('status')
export class ApiStateController {
  constructor(private config_service: ConfigService) {}

  @Get()
  apiStatus() {
    console.log('app status is active');
    console.log(process.env.DB_USER);

    const env_emoji = this.config_service.get<string>('App.env_emoji');
    const node_port = this.config_service.get<string>('App.node_env');

    return {
      status: HttpStatus.OK,
      message: `Urbanoverstock Backend ${node_port} APIs Running!!! ${env_emoji}`,
    };
  }
}
