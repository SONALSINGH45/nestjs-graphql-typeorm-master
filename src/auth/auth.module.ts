// // src/auth/auth.module.ts
// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { JwtAuthGuard } from "../auth.guard"
// @Module({
//     imports: [
//         PassportModule.register({ defaultStrategy: 'jwt' }),
//         JwtModule.registerAsync({
//             imports: [ConfigModule],
//             useFactory: async (configService: ConfigService) => ({
//                 secret: configService.get('GQL'),
//                 signOptions: { expiresIn: '1h' },
//             }),
//             inject: [ConfigService],
//         }),
//     ],
//     providers: [JwtAuthGuard],
//     exports: [JwtAuthGuard],
// })
// export class AuthModule { }
// AuthModule
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from "../services/auth.service"
import { AuthController } from "../controllers/aut.contoller"

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET_KEY'),
                signOptions: { expiresIn: '1h' },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule { }

