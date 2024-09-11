import { Module } from '@nestjs/common';
import { RazasService } from './razas.service';
import { RazasController } from './razas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Raza } from './entities/raza.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Raza]), AuthModule],
  controllers: [RazasController],
  providers: [RazasService],
  exports: [TypeOrmModule]
})
export class RazasModule {}
