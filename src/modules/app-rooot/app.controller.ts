import { Controller, Get } from '@nestjs/common';
import { AppServiceDto } from './interface';
import { AppService } from './service/';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/healthcheck')
  getServiceInfo(): AppServiceDto {
    return this.appService.getServiceInfo();
  }
}
