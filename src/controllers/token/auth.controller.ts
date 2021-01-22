import { Controller, Get } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { AuthService } from "../../services/token/auth.service";

@ApiTags('Token')
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
