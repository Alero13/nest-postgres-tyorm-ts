import { Module } from '@nestjs/common';
import { GatosModule } from './gatos/gatos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RazasModule } from './razas/razas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true
    }),

    /* GatosModule, */
    TypeOrmModule.forRoot({
      type: 'postgres',
      /* host: 'localhost',
      port: 5436,
      username: 'postgresNew',
      password: 'postgresNew',
      database: 'postgresDB-2', */

      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,

      /* entities: [], */
      autoLoadEntities: true,
      synchronize: true
    }),
    GatosModule,
    RazasModule,
    UsuariosModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
