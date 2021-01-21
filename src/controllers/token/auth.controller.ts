import { Controller, Get } from '@nestjs/common';

import { AuthService } from "../../services/token/auth.service";

@Controller('token')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @Get()
    getToken(): object {
        return this.authService.getToken();
    }
}
