import { Module } from '@nestjs/common';
import { GatosService } from './gatos.service';
import { GatosController } from './gatos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gato } from './entities/gato.entity';
//import { Raza } from 'src/razas/entities/raza.entity';
import { RazasModule } from 'src/razas/razas.module';
import { RazasService } from 'src/razas/razas.service';

@Module({
  /* imports: [TypeOrmModule.forFeature([Gato, Raza])], */

  imports: [TypeOrmModule.forFeature([Gato]), RazasModule],

  controllers: [GatosController],
  /* providers: [GatosService], */

  providers: [GatosService, RazasService],
})
export class GatosModule {}
