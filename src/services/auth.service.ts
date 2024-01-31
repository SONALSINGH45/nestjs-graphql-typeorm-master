// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    generateToken(): string {
        const defaultPayload = { sub: 'user_id', username: 'username' };
        return this.jwtService.sign(defaultPayload);
    }
}
