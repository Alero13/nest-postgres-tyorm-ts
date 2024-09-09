import { UseGuards, applyDecorators } from "@nestjs/common";
import { Role } from "../../common/roles.enum";
import { Roles } from "./roles.decorator";
import { RolesGuard } from "../guard/roles.guard";
import { AuthGuard } from "../guard/auth.guard";

export function Auth(rol: Role) {
    return applyDecorators(
        /* Roles(Role.ADMINISTRADOR), */

        Roles(rol),
        UseGuards(AuthGuard, RolesGuard)
    )
}