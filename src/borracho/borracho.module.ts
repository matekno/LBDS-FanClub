import { Module } from '@nestjs/common';
import { BorrachoController } from './borracho.controller';
import { BorrachoService } from './borracho.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [BorrachoController],
  providers: [BorrachoService, PrismaService, JwtService]
})
export class BorrachoModule {}
