import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RazasService } from './razas.service';
import { CreateRazaDto } from './dto/create-raza.dto';
import { UpdateRazaDto } from './dto/update-raza.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/roles.enum';

@Auth(Role.ADMINISTRADOR)
@Controller('razas')
export class RazasController {
  constructor(private readonly razasService: RazasService) {}

  @Post()
  create(@Body() createRazaDto: CreateRazaDto) {
    return this.razasService.create(createRazaDto);
  }

  @Get()
  findAll() {
    return this.razasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.razasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRazaDto: UpdateRazaDto) {
    return this.razasService.update(id, updateRazaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.razasService.remove(id);
  }
}
