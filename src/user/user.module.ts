import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { JwtService } from '@nestjs/jwt';



@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtService]
})
export class UserModule {}
