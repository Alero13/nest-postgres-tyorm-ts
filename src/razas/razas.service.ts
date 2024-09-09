import { Injectable } from '@nestjs/common';
import { CreateRazaDto } from './dto/create-raza.dto';
import { UpdateRazaDto } from './dto/update-raza.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Raza } from './entities/raza.entity';
import { Repository } from 'typeorm';

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
    return `This action returns a #${id} raza`;
  }

  async update(id: number, updateRazaDto: UpdateRazaDto) {
    return `This action updates a #${id} raza`;
  }

  async remove(id: number) {
    return `This action removes a #${id} raza`;
  }
}
