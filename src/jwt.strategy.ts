// // jwt.strategy.ts
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//     constructor(private readonly configService: ConfigService) {
//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             secretOrKey: configService.get('JWT_SECRET_KEY') || 'defaultSecretKey', // Provide a default key if not set
//         });
//     }

//     async validate(payload: any) {
//         // You can perform additional validation or checks here
//         if (!payload) {
//             throw new UnauthorizedException();
//         }
//         return { userId: payload.sub, username: payload.username };
//     }
// }
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'GQL', // Replace with your actual secret key
        });
    }

    async validate(payload: any) {
        // Add your user validation logic here
        return { userId: payload.sub, username: payload.username };
    }
}
