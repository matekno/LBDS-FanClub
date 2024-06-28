import { Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from "express";
import { BaseGuard } from './base.guard';

@Injectable()
export class IsOwnerGuard extends BaseGuard {
    constructor(jwtService: JwtService) {
        super(jwtService);
    }

    protected handleValidation(decoded: any, request: Request): boolean {
        const id = request.params.id;
        return decoded.id === +id;
    }
}
