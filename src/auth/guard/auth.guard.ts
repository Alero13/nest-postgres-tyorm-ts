import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
//import { Observable } from 'rxjs';

import { Request } from 'express'
import { jwtConstants } from '../constants/jwt.constant';
//import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
/* export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
} */

export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    /* console.log(request.headers.authorization); */

    const token = this.extractTokenFromHeader(request);
    if(!token) {
      throw new UnauthorizedException();
    }

    try { 
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
      /* request['usuario'] = payload; */

      request.usuario = payload;
      
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
