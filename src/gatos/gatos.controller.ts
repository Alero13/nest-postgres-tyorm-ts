import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GatosService } from './gatos.service';
import { CreateGatoDto } from './dto/create-gato.dto';
import { UpdateGatoDto } from './dto/update-gato.dto';
import { Role } from 'src/common/roles.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UsuarioActivo } from 'src/common/decorators/usuario-activo.decorator';
import { UsuarioActivoInterface } from 'src/common/interfaces/usuario-activo.interface';

@Auth(Role.USUARIO)
@Controller('gatos')
export class GatosController {
  constructor(private readonly gatosService: GatosService) {}

  @Post()
  /* create(@Body() createGatoDto: CreateGatoDto) { */

  create(@Body() createGatoDto: CreateGatoDto, @UsuarioActivo() usuario: UsuarioActivoInterface) {
    /* return this.gatosService.create(createGatoDto); */

    return this.gatosService.create(createGatoDto, usuario);
  }

  @Get()
  /* findAll() { */

  findAll(@UsuarioActivo() usuario: UsuarioActivoInterface) {
    return this.gatosService.findAll(usuario);
  }

  @Get(':id')
  /* findOne(@Param('id') id: number) { */

  findOne(@Param('id') id: number, @UsuarioActivo() usuario: UsuarioActivoInterface) {
    /* return this.gatosService.findOne(id); */

    return this.gatosService.findOne(id, usuario);
  }

  @Patch(':id')
  /* update(@Param('id') id: number, @Body() updateGatoDto: UpdateGatoDto) { */

  update(@Param('id') id: number, @Body() updateGatoDto: UpdateGatoDto, @UsuarioActivo() usuario: UsuarioActivoInterface) {
    return this.gatosService.update(id, updateGatoDto, usuario);
  }

  @Delete(':id')
  /* remove(@Param('id') id: number) { */

    remove(@Param('id') id: number, @UsuarioActivo() usuario: UsuarioActivoInterface) {
    return this.gatosService.remove(id, usuario);
  }
}
