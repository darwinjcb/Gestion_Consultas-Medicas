// src/app.module.ts:
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { EspecialidadesModule } from './especialidades/especialidades.module';
import { DoctoresModule } from './doctores/doctores.module';
import { CitasModule } from './citas/citas.module';
import { MedicamentosModule } from './medicamentos/medicamentos.module';
import { RecetasModule } from './recetas/recetas.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [PrismaModule, AuthModule, PacientesModule, EspecialidadesModule, DoctoresModule, CitasModule, MedicamentosModule, RecetasModule, UsuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
