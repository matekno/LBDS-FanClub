import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/Login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { createSecretKey } from 'crypto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtService: JwtService
    ) { }

    async login(dto: LoginDto) {
        const user = await this.validateUser(dto);
        const payload = {
            email: user.EMAIL,
            sub: {
                name: user.NAME,
            },
        };

        return {
            user,
            backend_tokens: {
                access_token: await this.jwtService.signAsync(payload, {
                    expiresIn: '1h',
                    secret: process.env.JWT_SECRET,
                }),
                refresh_token: await this.jwtService.signAsync(payload, {
                    expiresIn: '7d',
                    secret: process.env.JWT_REFRESH_TOKEN_KEY,
                }),
            }
        }
    }

    async validateUser(dto: LoginDto) {
        const user = await this.userService.findByEmail(dto.EMAIL);
        if (user && await compare(dto.PASSWORD, user.PASSWORD)) {
            const { PASSWORD, ...result } = user;
            return result;
        }
        throw new UnauthorizedException('Invalid credentials');
    }

}