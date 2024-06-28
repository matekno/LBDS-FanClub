import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MatchModule } from './match/match.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BorrachoModule } from './borracho/borracho.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [ConfigModule.forRoot(), MatchModule, UserModule, AuthModule, BorrachoModule, AdminModule], // forRoot(): esto nos permite usar variables de entorno
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
