// auth.controller.ts
import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from "../services/auth.service"
import { UserService } from 'src/users/UserService';


@Controller('auth')
export class AuthController {
    usersService: UserService;
    constructor(private readonly authService: AuthService) { }

    @Post('token')
    async createToken(): Promise<{ token: string }> {
        const token = this.authService.generateToken();
        return { token };
    }
    // @Get('send-message')
    // async sendMessage() {
    //     await this.usersService.onEvent('messageSent', { message: 'Hello from NestJS!' });
    //     return 'Message sent!';
    // }
}
