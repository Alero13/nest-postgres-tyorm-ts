import { Module } from '@nestjs/common';
import { GatosService } from './gatos.service';
import { GatosController } from './gatos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gato } from './entities/gato.entity';
//import { Raza } from '../razas/entities/raza.entity';
import { RazasModule } from '../razas/razas.module';
import { RazasService } from '../razas/razas.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  /* imports: [TypeOrmModule.forFeature([Gato, Raza])], */

  imports: [TypeOrmModule.forFeature([Gato]), RazasModule, AuthModule],

  controllers: [GatosController],
  /* providers: [GatosService], */

  providers: [GatosService, RazasService],
})
export class GatosModule {}
