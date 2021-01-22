import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenAuthGuard extends AuthGuard('jwt') {
  constructor(
    private jwt: JwtService
  ) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ) {
    let req = context.switchToHttp().getRequest();
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : undefined;
    
    if (token == undefined) {
      return super.canActivate(context);
    } else {
      let decoded: any = this.jwt.decode(token)
      
      if (decoded.token == 'APIJWTTOKEN') {
        return true;
      } else {
        return super.canActivate(context);
      }
    }
  }
}
