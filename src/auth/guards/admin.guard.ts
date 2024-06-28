import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from "express";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    private extractTokenFromHeader(request: Request) {
        try {
            const [type, token] = request.headers.authorization.split(' ');
            return type === 'Bearer' ? token : undefined;
        } catch (error) {
            return undefined;
        }
    }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('No authentication token provided');
        }

        const token = this.extractTokenFromHeader(request);        
        if (!token) {
            throw new UnauthorizedException('Bearer token malformed');
        }

        try {            
            const decoded = this.jwtService.decode(token);
            return decoded.role === 'admin';
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}