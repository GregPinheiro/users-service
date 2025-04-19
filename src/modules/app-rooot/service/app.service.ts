import { Injectable } from '@nestjs/common';
import { AppServiceDto } from '../interface';
import { StatusCodeEnum } from '../../../commom/enum';

@Injectable()
export class AppService {
  getServiceInfo(): AppServiceDto {
    return {
      env: process.env.NODE_ENV ?? 'development',
      appName: process.env.APP_NAME ?? 'NestJS',
      status: StatusCodeEnum.OK,
    };
  }
}
