import { SetMetadata } from '@nestjs/common'
import { Role } from '../../common/roles.enum';

export const ROLES_KEY = 'roles';

/* export const Roles = (rol) => SetMetadata('roles', rol) */
/* export const Roles = (rol) => SetMetadata(ROLES_KEY, rol) */

export const Roles = (rol: Role) => SetMetadata(ROLES_KEY, rol)