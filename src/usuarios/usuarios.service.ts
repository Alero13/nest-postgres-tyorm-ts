import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) {}

  create(createUsuarioDto: CreateUsuarioDto) {
    /* return 'This action adds a new usuario'; */

    return this.usuarioRepository.save(createUsuarioDto);
  }

  findOneByEmail( email: string) {
    return this.usuarioRepository.findOneBy({ email })
  }

  findOneByEmailWithPassword(email: string) {
    return this.usuarioRepository.findOne({
      where: { email },
      select: ['id', 'nombre', 'email', 'contraseña', 'rol']
    });
  }

   findAll() {
    /* return `This action returns all usuarios`; */

    return this.usuarioRepository.find();
  }

  /* findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  } */
}
