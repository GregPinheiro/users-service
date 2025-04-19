import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './service/app.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { DatabaseModule } from 'src/commom/database/database.module';

@Module({
  imports: [UsersModule, DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
