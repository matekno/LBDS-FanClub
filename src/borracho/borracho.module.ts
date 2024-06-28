import { Module } from '@nestjs/common';
import { BorrachoController } from './borracho.controller';
import { BorrachoService } from './borracho.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [BorrachoController],
  providers: [BorrachoService, PrismaService, JwtService, UserService]
})
export class BorrachoModule {}
