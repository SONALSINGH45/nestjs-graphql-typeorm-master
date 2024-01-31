// jwt.middleware.ts

import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) { }

    use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            try {
                const decoded = this.jwtService.verify(token);
                req['user'] = decoded; // Attach the decoded user to the request
                next();
            } catch (error) {
                // Handle invalid token
                console.error('Invalid JWT token:', error.message);
                throw new UnauthorizedException('Invalid token');
            }
        } else {
            next();
        }
    }
}
