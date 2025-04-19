import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../service/app.service';
import { StatusCodeEnum } from '../../../commom/enum';
describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return service info', () => {
      const result = appController.getServiceInfo();

      expect(result).toBeDefined();
      expect(result.env).toBe('test');
      expect(result.appName).toBe('NestJS');
      expect(result.status).toBe(StatusCodeEnum.OK);
    });
  });
});
