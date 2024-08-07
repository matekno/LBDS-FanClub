import { Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from "express";
import { BaseGuard } from './base.guard';

@Injectable()
export class AdminGuard extends BaseGuard {
    constructor(jwtService: JwtService) {
        super(jwtService);
    }

    protected handleValidation(decoded: any, request: Request): boolean {
        return decoded.role === 'admin';
    }
}
