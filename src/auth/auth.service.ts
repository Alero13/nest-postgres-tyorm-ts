import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor( 
        private readonly usuarioService: UsuariosService,
        private readonly jwtService: JwtService) {

    }

    /* async register(registerDto: RegisterDto){ */

    async register({nombre, email, contraseña}: RegisterDto){
        //return 'register'

        /* const usuario = await this.usuarioService.findOneByEmail(registerDto.email) */

        const usuario = await this.usuarioService.findOneByEmail(email)

        if (usuario) {
            throw new BadRequestException("Este usuario ya existe");
            
        }

        /* return await this.usuarioService.create({nombre, email, contraseña}) */

        /* return await this.usuarioService.create({ */

        await this.usuarioService.create({
            nombre, 
            email, 
            contraseña: await bcryptjs.hash(contraseña, 10)})

        return {
            nombre,
            email,
        }
    }

    /* login(loginDto: LoginDto) { */
    /* return 'login'; */
    async login({ email, contraseña}: LoginDto) {
        
        /* const usuario = await this.usuarioService.findOneByEmail(email) */
        const usuario = await this.usuarioService.findOneByEmailWithPassword(email)

        if(!usuario) {
            throw new UnauthorizedException('email no existe ')
        }

        const isContraseñaValida = await bcryptjs.compare(contraseña, usuario.contraseña)

        if(!isContraseñaValida) {
            throw new UnauthorizedException('contraseña incorrecta')
        }

        /* const payload = { email: usuario.email } */

        const payload = { email: usuario.email, rol: usuario.rol }

        const token = await this.jwtService.signAsync(payload)

        /* return usuario */

        return { token, email }
    }

    async Perfil({email, rol} : { email:string, rol: string }) {

        /* if(rol !=='administrador') {
            throw new UnauthorizedException('No esta autorizado para usar esta seccion')
        } */

        return await this.usuarioService.findOneByEmail(email)
    }
}
