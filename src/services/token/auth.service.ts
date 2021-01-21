import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
    ) { }

    getToken(): object {
        return {token: this.jwtService.sign({ token: 'APIJWTTOKEN' })} 
    }
}
