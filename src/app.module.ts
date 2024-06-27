import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()], // esto nos permite usar variables de entorno
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
