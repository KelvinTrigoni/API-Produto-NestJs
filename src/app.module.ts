
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosController } from './controllers/produtos/produtos.controller';
import { ProdutosService } from './services/produtos/produtos.service';
import { AuthController } from './controllers/token/auth.controller';
import { AuthService } from './services/token/auth.service';
import { TokenAuthGuard } from './token-auth.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'APIJWTTOKEN'
    }),
  ],
  controllers: [AppController, ProdutosController, AuthController],
  providers: [AppService, ProdutosService, AuthService, JwtStrategy],
  exports: [AuthService, JwtModule]
})
export class AppModule { }
