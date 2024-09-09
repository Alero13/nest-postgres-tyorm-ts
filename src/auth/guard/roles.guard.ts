import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
//import { Observable } from 'rxjs';

import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../common/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor( private readonly reflector: Reflector) {

  }

  canActivate(
    context: ExecutionContext,
  /* ): boolean | Promise<boolean> | Observable<boolean> { */
  ): boolean  {

    /* const rol = this.reflector.getAllAndOverride('roles' , [ */
    /* const rol = this.reflector.getAllAndOverride(ROLES_KEY , [ */

    const rol = this.reflector.getAllAndOverride<Role>(ROLES_KEY , [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!rol) {
      return true;
    }

    //console.log(rol)
    
    const { usuario } = context.switchToHttp().getRequest()

    /* return true; */

    if(usuario.rol === Role.ADMINISTRADOR){
      return true
    }

    return rol === usuario.rol;

  }
}
