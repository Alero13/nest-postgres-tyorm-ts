import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateRazaDto } from './dto/create-raza.dto';
import { UpdateRazaDto } from './dto/update-raza.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Raza } from './entities/raza.entity';
import { Repository } from 'typeorm';
import { UsuarioActivoInterface } from 'src/common/interfaces/usuario-activo.interface';
import { Role } from 'src/common/roles.enum';

@Injectable()
export class RazasService {

  constructor(

    @InjectRepository(Raza)
    private readonly razaRepository: Repository<Raza>

  ) {

  }

  async create(createRazaDto: CreateRazaDto) {
    //return 'This action adds a new raza';

    return await this.razaRepository.save(createRazaDto)
  }

  async findAll() {
    //return `This action returns all razas`;

    return await this.razaRepository.find();
  }

  async findOne(id: number) {
    /* return `This action returns a #${id} raza`; */

    const raza = await this.razaRepository.findOneBy({id});

    if (!raza) {
      throw new BadRequestException('La raza no fue encontrada')
    }

    return raza
  }

  async update(id: number, updateRazaDto: UpdateRazaDto) {
    /* return `This action updates a #${id} raza`; */

    return await this.razaRepository.update(id, updateRazaDto )
  }

  async remove(id: number) {
    /* return `This action removes a #${id} raza`; */

    await this.findOne(id)
    return await this.razaRepository.softDelete({id});
  }

  
}
