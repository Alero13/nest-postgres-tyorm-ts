import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateGatoDto } from './dto/create-gato.dto';
import { UpdateGatoDto } from './dto/update-gato.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gato } from './entities/gato.entity';
import { Repository } from 'typeorm';
import { Raza } from '..//razas/entities/raza.entity';
import { UsuarioActivoInterface } from 'src/common/interfaces/usuario-activo.interface';
import { Role } from '../common/roles.enum';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class GatosService {

  constructor(
    
    @InjectRepository(Gato)
    private readonly gatoRepository: Repository<Gato>,

    @InjectRepository(Raza)
    private readonly razaRepository: Repository<Raza>

  )
  { };


  /* async create(createGatoDto: CreateGatoDto) { */

  async create(createGatoDto: CreateGatoDto, usuario: UsuarioActivoInterface) {
    /* return 'This action adds a new gato'; */

    /* const gato = this.gatoRepository.create(createGatoDto); */
    /* return await this.gatoRepository.save(gato) */

    //return await this.gatoRepository.save(createGatoDto)

    //return

    /* const raza = await this.razaRepository.findOneBy({name: createGatoDto.raza})

    if(!raza) {
      throw new BadRequestException('La Raza no existe')
    } */

    const raza = await this.validaRaza(createGatoDto.raza)

    return await this.gatoRepository.save({
      ...createGatoDto,
      /* raza */
      raza: raza,
      usuarioEmail: usuario.email
    })

    
  }

  /* async findAll() { */
    /* return `This action returns all gatos`; */
    
    async findAll(usuario: UsuarioActivoInterface) {
      if (usuario.rol === Role.ADMINISTRADOR) {
        return await this.gatoRepository.find()
      }

      return await this.gatoRepository.find({
        where: { usuarioEmail: usuario.email },
      });
  }

  async findOne(id: number, usuario: UsuarioActivoInterface) {
    /* return `This action returns a #${id} gato`; */

    const gato = await this.gatoRepository.findOneBy({id});

    if (!gato) {
      throw new BadRequestException('EL gato no fue encontrado')
    }

    /* if (usuario.rol !== Role.ADMINISTRADOR && gato.usuarioEmail !== usuario.email) {
      throw new UnauthorizedException()
    } */

    this.validateOwnership(gato, usuario)

    return gato
  }

  /* async update(id: number, updateGatoDto: UpdateGatoDto) { */
  async update(id: number, updateGatoDto: UpdateGatoDto, usuario: UsuarioActivoInterface) {
    /* return `This action updates a #${id} gato`; */

    //return await this.gatoRepository.update(id, updateGatoDto );

    await this.findOne(id, usuario)
    /* const Raza = await this.validaRaza(updateGatoDto.raza) */

    /* return */
    return await this.gatoRepository.update(id, {
      ...updateGatoDto,
      /* raza: Raza, */
      raza: updateGatoDto.raza ? await this.validaRaza(updateGatoDto.raza) : undefined,
      usuarioEmail: usuario.email,
    })
  }

  async remove(id: number, usuario: UsuarioActivoInterface) {
    /* return `This action removes a #${id} gato`; */

    /* return await this.gatoRepository.softRemove({id}); Requiere la instancia */

    await this.findOne(id, usuario)
    return await this.gatoRepository.softDelete({id}); //Requiere el id
  }

  private validateOwnership(gato: Gato, usuario: UsuarioActivoInterface) {
    if (usuario.rol !== Role.ADMINISTRADOR && gato.usuarioEmail !== usuario.email) {
      throw new UnauthorizedException()
    }
  }

  private async validaRaza(raza: string) {
    const razaEntidad = await this.razaRepository.findOneBy({ name: raza})
    if (!razaEntidad) {
      throw new BadRequestException('Raza no fue encontada')
    }
    return razaEntidad
  }
}
